import { Container, Box, Toolbar } from '@mui/material';
import './App.css';
import Order from './components/Order';
import ResponsiveAppBar from './layouts/AppBar';

function App() {

  return (
    <div className="App">
      <Toolbar />
      <ResponsiveAppBar />
      <Container maxWidth="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
      <Box sx={{ my: 10 }}>
          <Order />
        </Box>
      </Container>
    </div>
  );
}

export default App;
