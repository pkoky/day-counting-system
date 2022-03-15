import React,{ useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


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
      
      setTimerYears(String(fullYears));
      setTimerDays(String(fullDays));
      setTimerHours(String(fullHours));
      setTimerMinutes(String(fullMinutes));
      setTimerSeconds(String(fullSeconds));

    }, 1000)
  }

  useEffect(() => {
    countdownTimer();
    return () => clearInterval();
  },[]);

  return (
    <Stack>
      <Box sx={{ p: 1}}>
        climate clock
      </Box>
      <Box sx={{ p: 1}}>
        {Number(timerYears) < 10 ? "0" + timerYears: timerYears}yrs
        {Number(timerDays) < 10 ? "0" + timerDays: timerDays}days
        {Number(timerHours) < 10 ? "0" + timerHours: timerHours}:
        {Number(timerMinutes) < 10 ? "0" + timerMinutes: timerMinutes}:
        {Number(timerSeconds) < 10 ? "0" + timerSeconds: timerSeconds}
      </Box>
    </Stack>
  )
}

export {ClimateClock};