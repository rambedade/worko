import { useState } from 'react';
import { addCandidate } from '../api';
import { Button, TextField, Container, Typography, Input, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReferCandidate = () => {
    const navigate = useNavigate();
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

        try {
            const newCandidate = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                jobTitle: formData.jobTitle,
                status: "Pending",
                resumeUrl: formData.resume ? URL.createObjectURL(formData.resume) : ""
            };

            await addCandidate(newCandidate);

            setSnackbarMessage("Candidate Referred Successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error("Error adding candidate:", error);
            setSnackbarMessage("Error submitting candidate. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Refer a Candidate
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="name" label="Name" fullWidth required onChange={handleChange} margin="normal" />
                <TextField name="email" label="Email" fullWidth required onChange={handleChange} margin="normal" type="email" />
                <TextField name="phone" label="Phone" fullWidth required onChange={handleChange} margin="normal" />
                <TextField name="jobTitle" label="Job Title" fullWidth required onChange={handleChange} margin="normal" />
                
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
