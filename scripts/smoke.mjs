#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const fail = (message) => failures.push(message)

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

if (failures.length) {
  console.error('smoke failed:')
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log('smoke ok')
