import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="sm" sx={{ height: '100vh'}}>
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{ minWidth: '100%'}}> 
          <CardContent>
            基準日 : 
            年 月 日
          </CardContent>
          <CardContent>
            目標日 :
            年 月 日
          </CardContent>
          <CardContent>
            <Button>計算</Button>（基準日を含む）
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
