import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import bgImage from '../../media/quiz.jpg'
import { QuizContext } from '../../context/context';

const ContainerBox = styled(Box)`
width:80%;
height:37vh;
border-width:3px;
border-color:#34C95E;
border-radius:1rem;
background-color:#fff;
padding:1rem;
padding-top:1rem;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  padding:.7rem;
  padding-top:1rem;
    }
`
const ContentItem = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
background-color:#E0F5EA;
padding:1rem;
border-radius:1rem;
width:80%;
height:90%;
color:#8e8e8e;
font-weight:550;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width:65%;
    height:60%;
    font-size:.8rem;
      }
`
const ActiveItem = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
padding:1rem;
border-radius:1rem;
width:80%;
height:90%;
background-image: url(${bgImage});
background-size: cover;
background-position: center;
cursor:pointer;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width:65%;
    height:60%;
      }
`

const TextStyle = styled(Typography)`
color: #34C95E;
text-align:center;
margin-top:7px;
`

const AllQuiz = ({ user }) => {
  const { setGameState } = React.useContext(QuizContext);

  const StartGame = () => {
    setGameState('start')
  }

  return (
    <ContainerBox border={2}>
      <Grid container rowSpacing={8} columnSpacing={{ xs: 2, sm: 1, md: 2 }}>
        {
          user && user.length > 0 ?
            <Grid xs={4}>
              <ActiveItem>
                <Typography style={{color:'#fff',fontSize:'1rem',fontWeight:700}}>Already</Typography>
              </ActiveItem>
              <TextStyle><strong>Quiz 1</strong></TextStyle>
            </Grid> :
            <Grid onClick={StartGame} xs={4}>
              <ActiveItem >
                <Typography style={{color:'#fff',fontSize:'1rem',fontWeight:700}}>Click</Typography>
              </ActiveItem>
              <TextStyle><strong>Quiz 1</strong></TextStyle>
            </Grid>
        }
        <Grid xs={4}>
          <ContentItem>Upcoming...</ContentItem>
          <TextStyle><strong>Game 1</strong></TextStyle>
        </Grid>
        <Grid xs={4}>
          <ContentItem>Upcoming...</ContentItem>
          <TextStyle><strong>Quiz 2</strong></TextStyle>
        </Grid>
        <Grid xs={4}>
          <ContentItem>Upcoming...</ContentItem>
          <TextStyle><strong>Game 2</strong></TextStyle>
        </Grid>
        <Grid xs={4}>
          <ContentItem>Upcoming...</ContentItem>
          <TextStyle><strong>Quiz 3</strong></TextStyle>
        </Grid>
        <Grid xs={4}>
          <ContentItem>Upcoming...</ContentItem>
          <TextStyle><strong>Game 3</strong></TextStyle>
        </Grid>
      </Grid>
    </ContainerBox>
  )
}

export default AllQuiz