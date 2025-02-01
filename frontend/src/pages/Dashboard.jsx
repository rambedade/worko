import { useEffect, useState } from 'react';
import { fetchCandidates, updateStatus, deleteCandidate } from '../api';
import CandidateCard from '../components/CandidateCard';
import { TextField, Container, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Dummy candidates for initial display
    const dummyCandidates = [
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

    // Fetch candidates from backend
    useEffect(() => {
        const getCandidates = async () => {
            try {
                const { data } = await fetchCandidates();
                setCandidates(data.length > 0 ? data : dummyCandidates);
            } catch (error) {
                console.error('Error fetching candidates:', error);
                setCandidates(dummyCandidates); // Show dummy data if backend fails
            } finally {
                setLoading(false);
            }
        };
        getCandidates();
    }, []);

    // Handle status update
    const handleStatusChange = async (id, status) => {
        try {
            await updateStatus(id, status);
            setCandidates(candidates.map(c => (c._id === id ? { ...c, status } : c)));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Handle delete candidate
    const handleDelete = async (id) => {
        try {
            await deleteCandidate(id);
            setCandidates(candidates.filter(c => c._id !== id));
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
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
            {loading ? (
                <CircularProgress />
            ) : (
                candidates
                    .filter(c => c.jobTitle.toLowerCase().includes(search) || c.status.toLowerCase().includes(search))
                    .map(candidate => (
                        <CandidateCard key={candidate._id} candidate={candidate} onStatusChange={handleStatusChange} onDelete={handleDelete} />
                    ))
            )}
        </Container>
    );
};

export default Dashboard;
