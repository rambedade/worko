import { useState } from 'react';
import { addCandidate } from '../api';
import { Button, TextField, Container, Typography, Input, Snackbar, Alert } from '@mui/material';
import './CandidateForm.css';  // ✅ Import the updated CSS

const CandidateForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        resume: null
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file upload (Only PDFs allowed)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            setSnackbarMessage("Only PDF files are allowed.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }
        setFormData({ ...formData, resume: file });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.phone || !formData.jobTitle) {
            setSnackbarMessage("All fields except resume are required.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));

        try {
            await addCandidate(data);
            setSnackbarMessage("Candidate Referred Successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            setFormData({ name: '', email: '', phone: '', jobTitle: '', resume: null });
        } catch (error) {
            setSnackbarMessage("Error submitting candidate. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth="sm" className="form-container">
            <Typography variant="h4" gutterBottom>
                Refer a Candidate
            </Typography>
            <form onSubmit={handleSubmit} className="form">
                <TextField name="name" label="Name" fullWidth required value={formData.name} onChange={handleChange} margin="normal" />
                <TextField name="email" label="Email" fullWidth required value={formData.email} onChange={handleChange} margin="normal" type="email" />
                <TextField name="phone" label="Phone" fullWidth required value={formData.phone} onChange={handleChange} margin="normal" />
                <TextField name="jobTitle" label="Job Title" fullWidth required value={formData.jobTitle} onChange={handleChange} margin="normal" />
                
                <div className="file-upload">
                    <Input type="file" onChange={handleFileChange} accept=".pdf" />
                </div>
                
                <Button type="submit" variant="contained" color="primary" fullWidth className="submit-btn">
                    Submit
                </Button>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} className="snackbar">
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CandidateForm;
