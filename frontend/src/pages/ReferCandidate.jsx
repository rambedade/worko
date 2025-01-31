import { useState } from 'react';
import { Button, TextField, Container, Typography, Input, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReferCandidate = () => {
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
    const navigate = useNavigate();

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
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.phone || !formData.jobTitle) {
            setSnackbarMessage("All fields except resume are required.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        // Get stored candidates from local storage
        const storedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];

        // Add new candidate
        const newCandidate = { _id: Date.now().toString(), ...formData, status: 'Pending' };
        storedCandidates.push(newCandidate);

        // Save updated list
        localStorage.setItem('candidates', JSON.stringify(storedCandidates));

        setSnackbarMessage("Candidate Referred Successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Clear form after successful submission
        setFormData({ name: '', email: '', phone: '', jobTitle: '', resume: null });

        // Redirect to Dashboard
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Refer a Candidate
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="name" label="Name" fullWidth required value={formData.name} onChange={handleChange} margin="normal" />
                <TextField name="email" label="Email" fullWidth required value={formData.email} onChange={handleChange} margin="normal" type="email" />
                <TextField name="phone" label="Phone" fullWidth required value={formData.phone} onChange={handleChange} margin="normal" />
                <TextField name="jobTitle" label="Job Title" fullWidth required value={formData.jobTitle} onChange={handleChange} margin="normal" />
                
                <Input type="file" onChange={handleFileChange} accept=".pdf" style={{ marginTop: '10px' }} />
                
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ReferCandidate;
