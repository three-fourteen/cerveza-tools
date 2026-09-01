import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve(__dirname, '..')

describe('package build', () => {
  it('keeps the library bundles after building the WebMCP entry point', () => {
    execFileSync('npm', ['run', 'build'], { cwd: projectRoot, stdio: 'pipe' })

    expect(existsSync(resolve(projectRoot, 'dist/cerveza-tools.es.js'))).toBe(true)
    expect(existsSync(resolve(projectRoot, 'dist/cerveza-tools.umd.js'))).toBe(true)
    expect(existsSync(resolve(projectRoot, 'dist/webmcp/index.js'))).toBe(true)
  })
})
