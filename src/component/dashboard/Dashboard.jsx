import React, { useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { getTopper } from '../../services/api'
import { QuizContext } from '../../context/context';
import AllQuiz from '../allQuiz/AllQuiz';
import Topper from '../topper/Topper';

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
    padding-bottom:1rem
      }
`
const ProfileBox = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:45%;
height:80vh;
border-radius:1rem;
background-color:#fff;
gap:1.5rem;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  width:90%;
  gap:.5rem;
  height:90%;
  padding-bottom:.5rem;
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
gap:1rem;
width:75%;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    width:80%;
    margin-top:.8rem
      }
`
const TopperBox = styled(Box)`
width:30%;
height:80vh;
border-radius:1rem;
display:flex;
align-items:center;
flex-direction:column;
background-color:#fff;
padding-top:1rem;
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
  width:88%;
  height:70vh;
  padding-top:.5rem;
  padding-bottom:.5rem;
  margin-top:1rem
    }
`
const UserName = styled(Typography)`
font-size: 1.5rem;
font-weight: 550; 
@media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size: .85rem;
    }
`
const TextStyle = styled(Typography)`
font-size: 1rem;
 color: #8e8e8e;
 font-weight: 550;
`

const Dashboard = () => {
    const { account } = React.useContext(QuizContext);
    const [user, setUser] = useState()
    const [index,setIndex]=useState()

    React.useEffect(() => {
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
            const filterUser = finalToppers.filter(a => a.email === account.email)
            const index = finalToppers.findIndex((topper) => topper.email === account.email);
            setUser(filterUser)
            setIndex(index)
        }
        getData()
    }, [])

    return (
        <Container>
            <ProfileBox >
                <UserBox>
                    <ProfileImage src={account.picture} alt='Profile_Image' />
                    <UserName>{account.name}</UserName>
                </UserBox>
                <TextStyle >Your Top Score :
                    {user && user.length>0 ?
                        <strong style={{ color: '#34C95E' }}> {user[0].score/5*100}%</strong> : ' Waiting...'
                    }
                </TextStyle>
                <TextStyle >Your Overall Rank : 
                    {user && user.length>0 ?
                         <strong style={{ color: '#34C95E' }}>{index+1}</strong> : ' Waiting...'  
                    }
                </TextStyle>
                <AllQuiz user={user} />

            </ProfileBox >
            <TopperBox>
                <Topper />
            </TopperBox>
        </Container>
    )
}

export default Dashboard