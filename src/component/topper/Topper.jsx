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
  width:85%;
  height:92%;
  border-width:3px;
  border-color:#34C95E;
  border-radius:1rem;
  padding:.3rem;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size:.5rem;
    padding-top:.5rem
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
`
const ViewAll=styled(Typography)`
  color: red;
  border-color: #34C95E;
  border-width:2px;
  font-size:.9rem;
  text-align:center;    
  line-height: 2.8;
  width:50%;
  margin-left:auto;
  height:2rem;
  font-weight:650;
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

const Topper = () => {
    const { account, setGameState } = useContext(QuizContext)
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
            // Get only the top 3 toppers
            const top3Toppers = finalToppers.slice(0, 3);
            setToppers(top3Toppers);
            console.log(topper)
        }
        getData()
    }, [account])

    const handleClick=()=>{
        setGameState('alltopper')
    }

    return (
        <TopperBox borderColor='green' border={2}>
            <Box style={{display:'flex',width:'100%'}}>
            <TopperText>Topper</TopperText>
            <ViewAll onClick={handleClick}>View All</ViewAll>
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
                    <Box style={{marginLeft:'auto'}}>
                        <Mark >{topper.score / 5 * 100}%</Mark>
                        <Mark >{300 - topper.counter}s</Mark>
                    </Box>
                </UserBox>
            ))}
            <TextStyle>*It will keep changing according to the top rank of the user.</TextStyle>
        </TopperBox>
    )
}

export default Topper