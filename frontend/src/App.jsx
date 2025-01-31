import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReferCandidate from './pages/ReferCandidate';
import { AppBar, Toolbar, Button, Container, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: 'red',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
}));

const ToolbarContainer = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const ContentContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  flexGrow: 1,
}));

const App = () => {
  return (
    <RootContainer style={{backgroundColor:"ActiveBorder"}}>
      <CssBaseline />
      <Router>
        <CustomAppBar position="static">
          <ToolbarContainer>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/refer">Refer a Candidate</Button>
          </ToolbarContainer>
        </CustomAppBar>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/refer" element={<ReferCandidate />} />
          </Routes>
        </ContentContainer>
      </Router>
    </RootContainer>
  );
};

export default App;
