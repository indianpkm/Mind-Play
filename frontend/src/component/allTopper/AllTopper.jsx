import React, { useContext, useEffect, useState } from 'react'
import { getTopper } from '../../services/api'
import { QuizContext } from '../../context/context'
import { Box, Typography, styled } from '@mui/material'
import bgImage from '../../media/win.png'
import Loading from '../loading/Loading'

const TopperImage = styled('img')({
    borderRadius: '50%',
    width: '2.7rem',
    height: '2.7rem'
})
const WinImg = styled('img')({
    borderRadius: '50%',
    width: '2.3rem',
    height: '2.3rem',
})

const UserBox = styled(Box)`
  display:flex;
  align-items:center;
  background-color:#E0F5EA;
  padding:1rem;
  border-radius:1rem;
  margin-top:1rem;
  gap:.3rem;
  width:83%;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  width:88%;
  padding:.7rem;
  gap:.5rem
    }
  `
const TopperBox = styled(Box)`
  width:50%;
  overflow:auto;
  height:92%;
  margin:auto;
  margin-top:1rem;
  border-width:3px;
  border-color:#34C95E;
  border-radius:1rem;
  padding:.3rem;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  background-color:#fff;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size:.5rem;
  margin:1rem;
  width:90%
    }
  `
const Rank = styled(Typography)`
  font-weight:600;
  font-size:1rem;
  color:#fff;  
  position:absolute;
  top: 1px;
  left: 13.5px;
  `
const TextStyle = styled(Typography)`
  color:#8e8e8e;
  font-size:.8rem;
  margin-top:1rem;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  font-size:.6rem;
  }
 `
const UserName = styled(Typography)`
font-weight: 550; 
fontSize: .5rem;
color:#8e8e8e;
margin-left:.1rem;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size: .8rem;
    }
`
const Mark = styled(Typography)`
font-size:.8rem;
color:#34C95E;
font-weight:550;
text-align:center;
margin-left:auto;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size: .6rem;
    }
`
const ViewAll=styled(Typography)`
  color: red;
  border-color: #34C95E;
  border-width:2px;
  font-size:1.1rem;
  text-align:center;    
  line-height: 2.5;
  width:50%;
  margin-left:auto;
  height:2rem;
  font-weight:700;
  &:hover{
      background-color:#34C95E;
      color:#fff;
      cursor:pointer;
  }
`
const TopperText=styled(Typography)`
font-weight: 550;
color: #34C95E;
font-size: 1.3rem;
text-align: center;
margin-left:20%
`
const Container = styled(Box)`
display:flex;
height:100vh;
align-items:center;
background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
overflow:auto;
&>div{
    margin:auto
}
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex-direction:column;
    gap:1rem;
    padding-top:1rem;
      }
`

const AllTopper = () => {
    const {  setGameState } = useContext(QuizContext)
    const [toppers, setToppers] = useState([])

    useEffect(() => {
        const getData = async () => {
            const topper = await getTopper()
            // Sort toppers by score in descending order
            const sortedToppers = topper.sort((a, b) => b.score - a.score);
            // Then sort by counter in descending order for toppers with the same score
            const finalToppers = sortedToppers.sort((a, b) => {
                if (a.score === b.score) {
                    return b.counter - a.counter;
                } else {
                    return 0;
                }
            });
            setToppers(finalToppers);
        }
        getData()
    }, [toppers])

    const handleClick=()=>{
        setGameState('dashboard')
    }

    return (
        <Container>
        <TopperBox borderColor='green' border={2}>
            <Box style={{ display: 'flex', width: '100%' }}>
                <TopperText>Topper</TopperText>
                <ViewAll onClick={handleClick}>Back</ViewAll>
            </Box>
            { toppers && toppers.length<1 ? <Loading/> :
            toppers.map((topper, index) => (
                <UserBox key={topper.email}>
                    <Box style={{ position: 'relative' }}>
                        <WinImg src={bgImage} />
                        <Rank>{index + 1}</Rank>
                    </Box>
                    <TopperImage src={topper.picture} alt='Profile_Image' />
                    <UserName>{topper.name}</UserName>
                    <Box style={{ marginLeft: 'auto',width:'25%' }}>
                        <Mark >Score : {topper.score / 5 * 100}%</Mark>
                        <Mark >Time : {300 - topper.counter}s</Mark>
                    </Box>
                </UserBox>
            ))}
            <TextStyle>*It will keep changing according to the top rank of the user.</TextStyle>
        </TopperBox>
        </Container>
    )
}

export default AllTopper