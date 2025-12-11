// backend/routes/files.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { File, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// make sure uploads dir exists
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // prefix timestamp to avoid collisions
    const safeName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'video/mp4'];
    if(!allowed.includes(file.mimetype)) {
      return cb(new Error('Unsupported file type'));
    }
    cb(null, true);
  }
});

// POST /api/upload (auth required)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if(!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { privacy } = req.body;
    if(!['public','private'].includes(privacy)) return res.status(400).json({ message: 'Invalid privacy' });

    const newFile = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: '/uploads/' + req.file.filename,
      size: req.file.size,
      privacy,
      uploaded_by: req.user.id
    });
    return res.status(201).json({ message: 'Uploaded', file: newFile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || 'Upload error' });
  }
});

// GET /api/public-files
router.get('/public-files', async (req, res) => {
  try {
    const files = await File.findAll({ where: { privacy: 'public' }, order: [['uploaded_at','DESC']] });
    return res.json(files);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/my-files (auth required)
router.get('/my-files', auth, async (req, res) => {
  try {
    const files = await File.findAll({ where: { uploaded_by: req.user.id }, order: [['uploaded_at','DESC']] });
    return res.json(files);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/files/:id/download
router.get('/files/:id/download', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if(!file) return res.status(404).json({ message: 'File not found' });

    // if private, must check share token or authenticate user — simple approach:
    // we'll allow download if public OR if client sends token and user is owner
    if(file.privacy === 'private') {
      const authHeader = req.headers.authorization;
      if(!authHeader) {
        // for private files, require an access token that proves ownership
        return res.status(403).json({ message: 'Private file: token required or use shareable link' });
      }
      const token = authHeader.split(' ')[1];
      // verify token
      const jwt = require('jsonwebtoken');
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload.id !== file.uploaded_by) {
          return res.status(403).json({ message: 'Not authorized to download this private file' });
        }
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    const fullPath = path.join(UPLOAD_DIR, file.filename);
    return res.download(fullPath, file.originalname);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/files/:id (auth required, owner only)
router.delete('/files/:id', auth, async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if(!file) return res.status(404).json({ message: 'File not found' });
    if(file.uploaded_by !== req.user.id) return res.status(403).json({ message: 'Not authorized to delete' });

    // delete file from uploads
    const fullPath = path.join(UPLOAD_DIR, file.filename);
    if(fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

    // delete DB record
    await file.destroy();
    return res.json({ message: 'File deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

