import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Fileupload from './FileUpload.js';
// import { Box } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box>
        <h2>Upload Images By Copy and Past</h2>
        <Fileupload />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;