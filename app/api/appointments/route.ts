import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { fieldsToHtml, sendTransactionalEmail } from '../../../lib/mail'
import { shop } from '../../../lib/shop'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
const MAX_FIELD = 400
const MAX_NOTES = 2000

type AppointmentInput = {
  name: string
  phone: string
  service: string
  date: string
  time: string
  email: string
  vehicle: string
  notes: string
  source: string
}

function asString(value: unknown, max = MAX_FIELD) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function isValidDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return false
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(year, month - 1, day)
  return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day
}

function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function validate(body: Record<string, unknown>): { ok: true; data: AppointmentInput } | { ok: false; error: string } {
  const source = asString(body.source, 40) || 'booking'
  const isContact = source === 'contact'
  const data: AppointmentInput = {
    name: asString(body.name, 120),
    phone: asString(body.phone, 40),
    service: asString(body.service, 120),
    date: asString(body.date, 10),
    time: asString(body.time, 5),
    email: asString(body.email, 160),
    vehicle: asString(body.vehicle, 160),
    notes: asString(body.notes, MAX_NOTES),
    source,
  }

  if (!data.name || !data.phone) {
    return { ok: false, error: isContact ? 'Name and phone are required.' : 'Name, phone, service, date, and time are required.' }
  }
  if (!isValidPhone(data.phone)) {
    return { ok: false, error: 'Enter a valid phone number with at least 10 digits.' }
  }

  if (isContact) {
    if (!data.service) data.service = 'Question / callback'
    if (data.date && !isValidDate(data.date)) {
      return { ok: false, error: 'Enter a valid preferred date.' }
    }
    if (data.time && !isValidTime(data.time)) {
      return { ok: false, error: 'Enter a valid preferred time.' }
    }
    return { ok: true, data }
  }

  if (!data.service || !data.date || !data.time) {
    return { ok: false, error: 'Name, phone, service, date, and time are required.' }
  }
  if (!isValidDate(data.date)) {
    return { ok: false, error: 'Enter a valid preferred date.' }
  }
  if (!isValidTime(data.time)) {
    return { ok: false, error: 'Enter a valid preferred time.' }
  }

  return { ok: true, data }
}

async function persistAppointment(record: Record<string, unknown>) {
  const candidates = [
    path.join(process.cwd(), 'data', 'appointments.json'),
    path.join('/tmp', 'steves-appointments.json'),
  ]

  for (const filePath of candidates) {
    try {
      await mkdir(path.dirname(filePath), { recursive: true })
      let existing: unknown[] = []
      try {
        const raw = await readFile(filePath, 'utf8')
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) existing = parsed
      } catch {
        existing = []
      }
      existing.push(record)
      await writeFile(filePath, JSON.stringify(existing, null, 2))
      return true
    } catch (error) {
      console.error(`[appointments] persist failed at ${filePath}`, error)
    }
  }

  return false
}

async function emailAppointment(record: AppointmentInput & { id: string; createdAt: string }) {
  const isContact = record.source === 'contact'
  const host = new URL(shop.siteUrl).host
  const title = isContact
    ? `New contact / callback request from ${host}`
    : `New appointment request from ${host}`
  const rows: Array<[string, string]> = [
    ['ID', record.id],
    ['Received', record.createdAt],
    ['Source', record.source],
    ['Name', record.name],
    ['Phone', record.phone],
    ['Email', record.email || 'Not provided'],
    ['Vehicle', record.vehicle || 'Not provided'],
    ['Service', record.service],
    ['Preferred date', record.date || 'Not provided'],
    ['Preferred time', record.time || 'Not provided'],
    ['Notes', record.notes || 'None'],
  ]
  const text = [
    title,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Call the customer or confirm at ${shop.phone}.`,
  ].join('\n')

  return sendTransactionalEmail({
    subject: `${isContact ? 'Contact request' : 'Appointment request'}: ${record.service}`,
    text,
    html: fieldsToHtml(title, rows),
    replyTo: record.email || undefined,
    idempotencyKey: `shop-appointment-${record.id}`,
  })
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    const parsed = await request.json()
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: 'Send a JSON object.' }, { status: 400 })
    }
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const validated = validate(body)
  if (validated.ok === false) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 })
  }

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...validated.data,
  }

  const saved = await persistAppointment(record)
  const delivered = await emailAppointment(record)

  return NextResponse.json({
    ok: true,
    id: record.id,
    saved,
    delivered,
  })
}
