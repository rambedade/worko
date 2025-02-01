import express from 'express';
import multer from 'multer';
import Candidate from '../models/Candidate.js';

const router = express.Router();

// Multer Config for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only PDF files are allowed!'), false);
    }
});

// POST - Add new candidate
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, jobTitle } = req.body;
        const resumeUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const candidate = await Candidate.create({ name, email, phone, jobTitle, resumeUrl });
        res.status(201).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Fetch all candidates
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update candidate status
router.put('/:id/status', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

        candidate.status = req.body.status;
        await candidate.save();
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Remove candidate
router.delete('/:id', async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.json({ message: 'Candidate deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
