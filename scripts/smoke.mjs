#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const fail = (message) => failures.push(message)

function read(rel) {
  const filePath = join(root, rel)
  if (!existsSync(filePath)) {
    fail(`missing ${rel}`)
    return ''
  }
  return readFileSync(filePath, 'utf8')
}

const tasksPath = join(root, 'TASKS.md')
if (!existsSync(tasksPath)) {
  fail('TASKS.md is missing')
} else {
  const open = [...readFileSync(tasksPath, 'utf8').matchAll(/^- \[ \] \*\*(S\d+)\*\*/gm)].map((m) => m[1])
  const leftover = open.filter((id) => id !== 'S12')
  if (leftover.length) {
    fail(`TASKS.md still has incomplete items besides S12: ${leftover.join(', ')}`)
  }
}

const nextConfigPath = join(root, 'next.config.js')
if (!existsSync(nextConfigPath)) {
  fail('next.config.js is missing')
} else if (/output\s*:\s*['"]export['"]/.test(readFileSync(nextConfigPath, 'utf8'))) {
  fail("next.config.js still has output: 'export'")
}

function hasApi(name) {
  return (
    existsSync(join(root, 'app', 'api', name, 'route.ts')) ||
    existsSync(join(root, 'app', 'api', name, 'route.js'))
  )
}

if (!hasApi('appointments')) fail('missing /api/appointments')
if (!hasApi('chat')) fail('missing /api/chat')

const hero = read('app/components/Hero.tsx')
if (!/Book Hybrid Diagnostic/.test(hero)) fail('Hero missing hybrid-battery CTA')
if (!/shop\.phone/.test(hero)) fail('Hero missing shop.phone CTA')
if (!/hybrid-battery-diagnostic-poster\.jpg/.test(hero)) fail('Hero missing poster image')
if (!/prefers-reduced-motion|motion-reduce|hero-poster/.test(hero)) {
  fail('Hero missing reduced-motion fallback')
}

const home = read('app/page.tsx')
for (const name of ['AppointmentBooking', 'ServicesSection', 'ContactSection', 'ChatBot']) {
  if (!home.includes(name)) fail(`page.tsx missing ${name}`)
}

for (const rel of [
  'app/components/AppointmentBooking.tsx',
  'app/components/ServicesSection.tsx',
  'app/components/ContactSection.tsx',
  'app/components/ChatBot.tsx',
  'app/services/hybrid-battery/page.tsx',
  'app/services/inspection/page.tsx',
  'app/services/brakes/page.tsx',
]) {
  if (!existsSync(join(root, rel))) fail(`missing ${rel}`)
}

const globals = read('app/globals.css')
if (!/prefers-reduced-motion/.test(globals)) fail('globals.css missing prefers-reduced-motion')

if (failures.length) {
  console.error('smoke failed:')
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log('smoke ok')
