import { Box, Button, Typography, styled } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { QuizContext } from '../../context/context'
import { quizData } from '../../services/api'
import Topper from '../topper/Topper'

const Container = styled(Box)`
display:flex;
height:100vh;
justify-content:center;
align-items:center;
flex-direction:column;
background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
`
const DashboardBox = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:45%;
height:90vh;
border-radius:1rem;
background-color:#fff;
gap:1rem;
padding-bottom:1rem;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  width: 90%;
}
`

const ProfileImage = styled('img')({
  borderRadius: '50%',
  width: '5rem',
  height: '5rem'
})

const UserBox = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
background-color:#E0F5EA;
padding:1rem;
border-radius:1rem;
margin-top:1rem;
gap:1rem;
width:75%;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  width: 80%;
  height: auto;
}
`
const UserName=styled(Typography)`
font-size: 1.5rem;
font-weight: 550; 
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size: .9rem;
    }
`

const ButtonStyle=styled(Button)`
  color: #fff;
  border-color: #fff;
  border-width:2px;
  width:10rem;
  height:2rem;
  font-weight:550;
  margin-top:.5rem;
  padding:.8rem;
  &:hover{
    background-color:#34C95E;
    color:#fff;
  }
`

const End = () => {
  const {setGameState, account, score, counter } = useContext(QuizContext)

  useEffect(() => {
    const saveUser = async () => {
      const currentEmail=account.email
      const currentPicture=account.picture
      const currentName=account.name
      const dataObject = {
        email: currentEmail,
        score: score,
        counter: counter,
        picture:currentPicture,
        name:currentName,
      }
      await quizData(dataObject)
    }
    saveUser()
  }, [])

  const handleClose=()=>{
    setGameState('dashboard')
  }

  return (
    <Container>
      <DashboardBox>
        <UserBox>
          <ProfileImage src={account.picture} alt='Profile_Image' />
          <UserName >{account.name}</UserName>
        </UserBox>
        <Typography style={{ fontWeight: 550, color: '#34C95E', fontSize: '1.5rem' }}>Thank You !</Typography>
        <Typography style={{ fontSize: '1rem', color: '#8e8e8e' }}>Your Score: <strong style={{ color: 'red' }}> {score / 5 * 100}%</strong></Typography>
        <Typography style={{ fontSize: '1rem', color: '#8e8e8e', marginTop: -10 }}>Time Taken : <strong style={{ color: 'red' }}>{300-counter}s  </strong> </Typography>
        <Topper/>
      </DashboardBox>
      <ButtonStyle variant='outlined' onClick={handleClose}>Go To Profile</ButtonStyle>
    </Container>
  )
}

export default End