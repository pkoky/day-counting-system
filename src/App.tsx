import React,{ useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';

import Stack from '@mui/material/Stack';

import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { format } from 'date-fns'
import {CopyToClipboard} from 'react-copy-to-clipboard';


function App() {
  const [referenceDate, setReferenceDate] = useState<Date | null>(new Date())
  const [targetDate, setTargetDate] = useState<Date | null>(new Date())
  const [resultData, setResultData] = useState('')

  const changeDateHandler = (newDate: Date | null): void => {
    setReferenceDate(newDate)
  }

  const changeTargetDateHandler = (newDate: Date | null): void => {
    setTargetDate(newDate)
  }

  const caluculate = (): void => {
    const formattedReferenceData = referenceDate != null ? formattingData(referenceDate) : null;
    const formattedTargetData = targetDate != null ? formattingData(targetDate) : null;

    if (formattedReferenceData != null && formattedTargetData != null) {
      const targetJulius = getModifiedJuliusDay(formattedTargetData.y, formattedTargetData.m, formattedTargetData.d);
      const referenceJulius = getModifiedJuliusDay(formattedReferenceData.y, formattedReferenceData.m, formattedReferenceData.d);
      const numberOfDay = String(targetJulius - referenceJulius);
      setResultData(numberOfDay);
    }
  }

  const formattingData = (date: Date) => {
    console.log(date)
    if (date == null) return;
    const year = Number(format(date, "y"));
    const month = Number(format(date, "M"));
    const day = Number(format(date, "d"));
    let result = {y: year, m: month, d: day};
    return result;
  }

  // フリーゲルの公式を使用 -> 修正ユリウス日を求める
  const getModifiedJuliusDay = (y: number, m: number, d: number): number => {
    if (m < 3) {
      m = m === 1 ? 13 : 14;
      y -= 1;
    }
    
    let result = Math.floor(365.25 * y); // 閏年を入れた年間の平均日数
    result += Math.floor(y / 400); // 閏年の例外を補正する計算
    result -= Math.floor(y / 100); // 閏年の例外を補正する計算
    result += Math.floor(30.59 * (m - 2)); // グレゴリオ暦との差異日数の補正値
    result += d;
    result -= 678912;

    return result;
  }

  return (
    <Container maxWidth="sm" sx={{ height: '100vh'}}>
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Stack spacing={4}>
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
            </CardContent>
            <CardContent>
              <Button onClick={caluculate}>計算</Button>（基準日を含まない）
            </CardContent>
          </Card>
          <Card>
            <Grid container sx={{ p: 2}}>
              <Grid item xs={10}>
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                  {resultData} 日
                </Box>
              </Grid>
              <Grid item xs={2}>
                <CopyToClipboard text={resultData + '日'}>
                  <IconButton size="small">
                    <ContentCopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}

export default App;
