import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../../context/context'
import { Box, List, ListItem ,Typography,styled } from '@mui/material';

const Container=styled(Box)`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
flex-direction:column;
background: rgb(88,233,247);
background: radial-gradient(circle, rgba(88,233,247,1) 0%, rgba(6,210,248,1) 35%, rgba(0,212,255,1) 100%);
height:100vh;
padding:1rem;
`

const ListStyle=styled(List)`
border-radius:1rem;
padding:1rem;
border-color:red;
max-width:700px;
background-color:#ffffff;
&>li{
  color:green
}
`

const LiStyle=styled(ListItem)`
color:#34C95E;
font-size:1.5rem;
border-radius:1rem;
display:flex;
padding:.5rerm;
margin-top:1rem;
font-size:1.5rem;
font-weight:550;
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
justify-content:center;
&:hover{
  color:#fff;
  background-color:#34C95E;
  cursor:pointer
}
`
const TimeStyle=styled(Box)`
margin-bottom:2rem;
font-size:1.5rem;
font-weight:650;
background-color:#fff;
border-radius:1rem;
width:20rem;
color:#a421ef;
padding:1rem;
`
const TypographyStyle=styled(Typography)`
font-size:1rem;
font-weight:550;
color:#8e8e8e;
`

const Quiz = () => {
    const {question,score,setScore,setGameState,setCounter}=useContext(QuizContext)
    const [timeLeft, setTimeLeft] = useState(300); // initial timer value
    const [index,setIndex]=useState(0)
  
  useEffect(() => {
    // Decrement the timer by 1 every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Clear the timer when the timeLeft reaches 0
    if (timeLeft <1) {
      clearInterval(timer);
      setGameState('end')
      setCounter(0)
      // code to handle when the timer reaches 0
    }

    // Cleanup function to clear the timer when the component unmounts or the timer is reset
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if(question[index].answer===option){
      setScore(score+1)
    }
    setIndex(index+1)
  };
  if(index===5){
    setGameState('end')
    setCounter(timeLeft)
  }
  
  return (
    <Container>
      { question.length>0 &&
      <>
      {index < 5 &&( timeLeft > 0? (
        <TimeStyle> Time Left : <strong style={{color:'red'}}> {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60} </strong> </TimeStyle>
      ) : (
        <Box>Time's up!</Box>
      ))}
      { 
      index!==5 &&
        <ListStyle alignItems='center' key={question[index].question}>
        <TypographyStyle>{question[index].questionh}</TypographyStyle>
        <TypographyStyle>{question[index].question}</TypographyStyle>
          <LiStyle onClick={()=>{handleAnswer('a')}} >{question[index].optionA}</LiStyle>
          <LiStyle onClick={()=>{handleAnswer('b')}} >{question[index].optionB}</LiStyle>
          <LiStyle onClick={()=>{handleAnswer('c')}} >{question[index].optionC}</LiStyle>
          <LiStyle onClick={()=>{handleAnswer('d')}} >{question[index].optionD}</LiStyle>
      </ListStyle>
      }
      </>
}
  </Container>
  )
}

export default Quiz