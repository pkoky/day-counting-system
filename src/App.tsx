import React,{ useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Container from '@mui/material/Container';

import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'


function App() {
  const [referenceDate, setReferenceDate] = useState<Date | null>(new Date())
  const [targetDate, setTargetDate] = useState<Date | null>(new Date())

  // Reference Date
  const changeDateHandler = (newDate: Date | null): void => {
    setReferenceDate(newDate)
    console.log(referenceDate)
  }

  const changeTargetDateHandler = (newDate: Date | null): void => {
    setTargetDate(newDate)
    console.log(targetDate)
  }

  const caluculate = (): void => {
    console.log(referenceDate)
    console.log(targetDate)
  }


  return (
    <Container maxWidth="sm" sx={{ height: '100vh'}}>
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{ minWidth: '100%'}}> 
          <CardContent>
            基準日 : 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker 
                value={referenceDate} 
                format="yyyy年M月d日"
                onChange={changeDateHandler} />
            </MuiPickersUtilsProvider>
          </CardContent>
          <CardContent>
            目標日 :
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker 
                value={targetDate} 
                format="yyyy年M月d日"
                onChange={changeTargetDateHandler} />
            </MuiPickersUtilsProvider>
            年 月 日
          </CardContent>
          <CardContent>
            <Button onClick={caluculate}>計算</Button>（基準日を含む）
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
