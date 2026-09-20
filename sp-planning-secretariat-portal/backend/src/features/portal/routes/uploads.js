const express = require('express')
const multer  = require('multer')
const sharp   = require('sharp')
const fs      = require('fs')
const path    = require('path')
const { v4: uuidv4 } = require('uuid')

const router      = express.Router()
const UPLOADS_DIR = path.join(__dirname, '../../../../uploads')
const MAX_SIZE    = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIMETYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
      return cb(new Error('UNSUPPORTED_TYPE'))
    }
    cb(null, true)
  },
})

// ── POST /api/uploads/image ─────────────────────────────────────────────────
router.post('/image', (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Image is too large. Maximum size is 5MB.' })
    }
    if (err) {
      return res.status(400).json({ error: 'Unsupported file type. Please upload a PNG, JPEG, WEBP, or GIF image.' })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded.' })
    }

    try {
      const webpBuffer = await sharp(req.file.buffer).rotate().webp({ quality: 82 }).toBuffer()
      const filename   = `${uuidv4()}.webp`

      if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), webpBuffer)

      res.json({ ok: true, url: `/uploads/${filename}` })
    } catch {
      res.status(422).json({ error: 'Could not process image. Is it a valid image file?' })
    }
  })
})

module.exports = router
