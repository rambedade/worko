import { Card, CardContent, Typography, Select, MenuItem, Button } from '@mui/material';

const CandidateCard = ({ candidate, onStatusChange, onDelete }) => {
    return (
        <Card sx={{ marginBottom: 2, padding: 2 }}>
            <CardContent>
                <Typography variant="h6">{candidate.name}</Typography>
                <Typography variant="body1">{candidate.jobTitle}</Typography>
                
                {/* Status Dropdown */}
                <Select 
                    value={candidate.status} 
                    onChange={(e) => onStatusChange(candidate._id, e.target.value)}
                    sx={{ marginRight: 2 }}
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Reviewed">Reviewed</MenuItem>
                    <MenuItem value="Hired">Hired</MenuItem>
                </Select>
                
                {/* Delete Button */}
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => onDelete(candidate._id)}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default CandidateCard;
    