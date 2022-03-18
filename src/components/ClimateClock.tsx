import React,{ useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import {theme} from './../style/index'
import { setTokenSourceMapRange } from 'typescript';



const ClimateClock = () => {
  const [timerYears, setTimerYears] = useState("00");
  const [timerDays,setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00"); 

  

  const countdownTimer = () => {
    const countdownDate = new Date("Jan 01, 2028 14:00:00").getTime();
    setInterval(() => {
      const todaysTime = new Date().getTime();
      const timeDistance = countdownDate - todaysTime;
      const fullYears = Math.floor(timeDistance / (1000 * 60 * 60 * 24 * 365));
      const fullDays = Math.floor(timeDistance / (1000 * 60 * 60 * 24) / fullYears - 97)
      const fullHours = Math.floor((timeDistance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const fullMinutes = Math.floor((timeDistance % (1000 * 60 * 60) / (1000 * 60)));
      const fullSeconds = Math.floor((timeDistance % (1000 * 60) / 1000));
      
      
      setTimerYears(getDateStr(fullYears));
      setTimerDays(getDateStr(fullDays));
      setTimerHours(getDateStr(fullHours));
      setTimerMinutes(getDateStr(fullMinutes));
      setTimerSeconds(getDateStr(fullSeconds));

    }, 1000)
  }

  useEffect(() => {
    countdownTimer();
    return () => clearInterval();
  },[]);

  const getDateStr = (num: number): string => {
    const result = num < 10 ? '0' + String(num) : String(num);
    return result;
  }

  return (
    <Stack sx={{ py: 1 }}>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h2" sx={{ fontFamily: ["Rubik"], color: theme.palette.secondary.main }}>
          Climate Clock
        </Typography>
      </Box>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ fontFamily: ["Rubik"]}}>
          {timerYears}yrs
          {timerDays}days
          {timerHours}:
          {timerMinutes}:
          {timerSeconds}
        </Typography>
      </Box>
    </Stack>
  )
}

export {ClimateClock};