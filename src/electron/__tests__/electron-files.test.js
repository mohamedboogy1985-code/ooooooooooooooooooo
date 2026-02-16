import { test, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const root = path.resolve(process.cwd())

test('electron entry files exist and export createWindow', () => {
  const mainPath = path.join(root, 'main.js')
  const preloadPath = path.join(root, 'preload.js')

  expect(fs.existsSync(mainPath)).toBe(true)
  expect(fs.existsSync(preloadPath)).toBe(true)

  const mainContent = fs.readFileSync(mainPath, 'utf8')
  expect(mainContent).toContain('createWindow')

  const preloadContent = fs.readFileSync(preloadPath, 'utf8')
  expect(preloadContent).toContain('contextBridge')
})

test('package.json references electron entry files and icon', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
  expect(pkg.main).toBe('main.js')
  expect(pkg.build).toBeTruthy()
  expect(pkg.build.files).toEqual(expect.arrayContaining(['dist/**/*', 'main.js', 'preload.js', 'package.json', 'public/**/*']))
  expect(fs.existsSync(path.join(root, 'public', 'pac.ico'))).toBe(true)
})