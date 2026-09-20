import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { extname, basename, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TARGET_DIR = join(__dirname, '..', 'public', 'branding')
const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg'])
const QUALITY = 82

async function convertFile(file) {
  const ext = extname(file).toLowerCase()
  if (!ALLOWED_EXT.has(ext)) return null

  const srcPath = join(TARGET_DIR, file)
  const destPath = join(TARGET_DIR, `${basename(file, ext)}.webp`)

  if (statSync(srcPath).isDirectory()) return null

  try {
    if (existsWebp(destPath)) {
      console.log(`skip (already converted): ${file}`)
      return null
    }

    const originalSize = statSync(srcPath).size
    await sharp(srcPath).webp({ quality: QUALITY }).toFile(destPath)
    const newSize = statSync(destPath).size
    unlinkSync(srcPath)

    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1)
    console.log(`converted: ${file} -> ${basename(destPath)}  (${formatBytes(originalSize)} -> ${formatBytes(newSize)}, -${reduction}%)`)
    return { originalSize, newSize }
  } catch (err) {
    console.error(`FAILED: ${file} — ${err.message}`)
    return null
  }
}

function existsWebp(destPath) {
  try {
    statSync(destPath)
    return true
  } catch {
    return false
  }
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`
}

async function main() {
  const files = readdirSync(TARGET_DIR)
  let converted = 0
  let totalOriginal = 0
  let totalNew = 0

  for (const file of files) {
    const result = await convertFile(file)
    if (result) {
      converted += 1
      totalOriginal += result.originalSize
      totalNew += result.newSize
    }
  }

  console.log('---')
  console.log(`Converted ${converted} file(s).`)
  if (converted > 0) {
    const reduction = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1)
    console.log(`Total: ${formatBytes(totalOriginal)} -> ${formatBytes(totalNew)} (-${reduction}%)`)
  }
}

main()
