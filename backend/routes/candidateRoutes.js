import express from 'express';
import Candidate from '../models/Candidate.js';

const router = express.Router();

// ✅ POST Route to Add Candidates
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, jobTitle, status, resumeUrl } = req.body;

        // ✅ Ensure all required fields are provided
        if (!name || !email || !phone || !jobTitle) {
            return res.status(400).json({ message: "All fields except resume are required." });
        }

        const newCandidate = new Candidate({
            name,
            email,
            phone,
            jobTitle,
            status: status || "Pending",
            resumeUrl: resumeUrl || ""
        });

        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (error) {
        console.error("Error adding candidate:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
