import { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import { TextField, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // Sample candidates (Hardcoded for frontend only)
    const sampleCandidates = [
        {
            _id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            jobTitle: 'Software Engineer',
            status: 'Pending'
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            jobTitle: 'Product Manager',
            status: 'Reviewed'
        },
        {
            _id: '3',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            phone: '5551234567',
            jobTitle: 'UI/UX Designer',
            status: 'Hired'
        }
    ];

    const [candidates, setCandidates] = useState(() => {
        const savedCandidates = localStorage.getItem('candidates');
        return savedCandidates ? JSON.parse(savedCandidates) : sampleCandidates;
    });

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Save candidates to local storage
    useEffect(() => {
        localStorage.setItem('candidates', JSON.stringify(candidates));
    }, [candidates]);

    // Function to add a new candidate
    const handleAddCandidate = (newCandidate) => {
        setCandidates(prevCandidates => [...prevCandidates, { _id: Date.now().toString(), ...newCandidate }]);
    };

    const handleStatusChange = (id, status) => {
        setCandidates(prevCandidates =>
            prevCandidates.map(c => (c._id === id ? { ...c, status } : c))
        );
    };

    const handleDelete = (id) => {
        setCandidates(prevCandidates => prevCandidates.filter(c => c._id !== id));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Candidate Dashboard
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={() => navigate('/refer')}>
                Add Candidate
            </Button>
            <TextField 
                label="Search by job title or status" 
                fullWidth 
                onChange={(e) => setSearch(e.target.value.toLowerCase())} 
                sx={{ marginBottom: 2 }}
            />
            {candidates
                .filter(c => c.jobTitle.toLowerCase().includes(search) || c.status.toLowerCase().includes(search))
                .map(candidate => (
                    <CandidateCard key={candidate._id} candidate={candidate} onStatusChange={handleStatusChange} onDelete={handleDelete} />
                ))}
        </Container>
    );
};

export default Dashboard;
