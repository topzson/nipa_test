import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Home() {


  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบ Ticket</h1>
        <h4>My Ticket</h4>
        <Box sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              
            </Typography>
            
          </CardContent>
          <CardActions>
            <Button size="small">STATUS</Button>
          </CardActions>
          
        </Box>
        
      </Container>
    </div>
  );
}
export default Home;