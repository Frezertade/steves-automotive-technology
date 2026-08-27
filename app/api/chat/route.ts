import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SHOP_PHONE = '(717) 330-0041'
const SHOP_ADDRESS = '1027 Dillerville Rd #16, Lancaster, PA 17603'
const SHOP_HOURS =
  'Monday–Friday 8:30 AM–5:00 PM, Saturday 8:30 AM–1:00 PM, Sunday closed'
const MAX_MESSAGE = 1000

const KNOWLEDGE = [
  "Steve's Automotive Technology is an independent hybrid-battery specialist and auto repair shop serving Lancaster and Millersville, PA. Not a car dealership.",
  `Address: ${SHOP_ADDRESS}.`,
  `Phone: ${SHOP_PHONE}. Email: stevesautotech@gmail.com.`,
  `Hours: ${SHOP_HOURS}.`,
  'Hybrid battery work: full diagnostics first (warning lights, capacity, module balance), reconditioning when cells/modules can be restored, and replacement only when the pack is beyond repair.',
  'Replacement is typically thousands less than a dealer pack quote. Do not invent a dollar amount — ask for year/make/model, mileage, and warning lights, then book a diagnostic or call.',
  'Also handles inspections, brakes, A/C, oil changes, and general auto repair.',
  'For booking, point people to the appointment form on this site or the shop phone.',
].join('\n')

function asString(value: unknown, max = MAX_MESSAGE) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function keywordReply(message: string) {
  const text = message.toLowerCase()

  const aboutHours =
    /\b(hour|hours|open|opens|opening|close|closed|closing|sunday|saturday)\b/.test(text) ||
    text.includes('what time')
  const aboutPlace = /\b(where|address|location|located|directions?|map)\b/.test(text)
  const aboutPhone = /\b(phone|call|number|contact)\b/.test(text)
  const aboutHybrid =
    /\b(hybrid|battery|prius|camry|insight|module|cell|recondition|reconditioning|pack)\b/.test(text)
  const aboutPrice = /\b(price|pricing|quote|cost|how much|dealer|dealership)\b/.test(text)
  const aboutWarn = /\b(warning|check engine|dash|light|code|codes|p0a80)\b/.test(text)
  const aboutBrakes = /\b(brake|brakes|rotor|pads)\b/.test(text)
  const aboutInspect = /\b(inspect|inspection|sticker|emission)\b/.test(text)
  const aboutAc = /\b(a\/c|ac |air condition|air-condition|coolant)\b/.test(text)
  const aboutBook = /\b(book|appoint|schedule|diagnostic)\b/.test(text)

  if (aboutHours && !aboutHybrid) {
    return `Shop hours are ${SHOP_HOURS}. For the fastest help, call ${SHOP_PHONE} during those hours or send an appointment request on this page.`
  }

  if (aboutPlace && !aboutHybrid) {
    return `Steve's Automotive Technology is at ${SHOP_ADDRESS}, serving Lancaster and Millersville drivers. Call ${SHOP_PHONE} if you need directions.`
  }

  if (aboutPhone && !aboutHybrid && !aboutPrice) {
    return `Call Steve's Automotive Technology at ${SHOP_PHONE}. Hours: ${SHOP_HOURS}.`
  }

  if (aboutHybrid) {
    return `Yes — Steve's specializes in hybrid battery diagnostics, reconditioning, and replacement for packs that cannot be restored. Diagnostics come first (warning lights, capacity, and module balance). Reconditioning keeps a healthy pack in service; replacement is quoted only when needed and is typically thousands less than a dealer pack. Call ${SHOP_PHONE} or book a hybrid diagnostic with year/make/model, mileage, and symptoms — we do not guess a price without that.`
  }

  if (aboutPrice) {
    return `Pricing depends on the vehicle and the diagnosis. Hybrid battery work is often thousands less than a dealer replacement quote after we test the pack. Send year/make/model and symptoms through the appointment form, or call ${SHOP_PHONE}.`
  }

  if (aboutWarn) {
    return `A hybrid or check-engine warning light is worth a diagnostic before the pack is replaced. Bring the vehicle in or call ${SHOP_PHONE} with the year/make/model and what the dash shows.`
  }

  if (aboutBrakes) {
    return `Steve's handles brake inspection and repair along with hybrid electrical work. Call ${SHOP_PHONE} or book a visit with the vehicle details.`
  }

  if (aboutInspect) {
    return `Inspections are available during shop hours (${SHOP_HOURS}). Call ${SHOP_PHONE} or use the appointment form to get on the schedule.`
  }

  if (aboutAc) {
    return `A/C and general auto repair are in the shop alongside hybrid battery work. Call ${SHOP_PHONE} with the vehicle and symptoms, or book on this page.`
  }

  if (aboutBook) {
    return `Use the appointment form on this page or call ${SHOP_PHONE}. Hours are ${SHOP_HOURS}. For hybrid battery concerns, a diagnostic is the right first step.`
  }

  return `I can help with hybrid battery diagnostics, reconditioning, replacement versus dealer quotes, hours, and booking. Shop hours: ${SHOP_HOURS}. Address: ${SHOP_ADDRESS}. For the quickest answer, call ${SHOP_PHONE}.`
}

async function openaiReply(message: string) {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) return null

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 280,
        messages: [
          {
            role: 'system',
            content: [
              'You are the website assistant for Steve\'s Automotive Technology.',
              'Answer only from this shop knowledge. Do not invent prices, warranties, or customer names.',
              'Keep replies short (2–5 sentences). Always include the phone number when suggesting a next step.',
              KNOWLEDGE,
            ].join('\n'),
          },
          { role: 'user', content: message },
        ],
      }),
    })

    if (!res.ok) {
      console.error('[chat] OpenAI failed:', res.status, await res.text())
      return null
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: unknown } }[]
    }
    const text = data.choices?.[0]?.message?.content
    if (typeof text !== 'string' || !text.trim()) return null
    return text.trim()
  } catch (error) {
    console.error('[chat] OpenAI threw:', error)
    return null
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    const parsed = await request.json()
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Send a JSON object.' }, { status: 400 })
    }
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const message = asString(body.message ?? body.text)
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  const text = (await openaiReply(message)) ?? keywordReply(message)
  return NextResponse.json({ text })
}
