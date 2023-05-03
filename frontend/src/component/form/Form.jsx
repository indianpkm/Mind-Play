import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { QuizContext } from '../../context/context';
import { Box, Typography, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { addUser } from '../../services/api';

const TypographyStyle = styled(Typography)`
margin-top:2rem;
color:#8e8e8e;
font-weight:520
`
const Container=styled(Box)`
display:flex;
height:100vh;
justify-content:center;
align-items:center;
background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
`

export default function Form() {
  const { setGameState,setAccount } = React.useContext(QuizContext);


  const onLoginSuccess=async(res)=>{
    const decode = jwt_decode(res.credential);
    setAccount(decode)
    setGameState('dashboard')
    await addUser(decode)
  }

  const onLoginError=(res)=>{
    console.log('Login Fail : ' , res)
  }

  return (
    <Container >
      <Dialog
        open={true}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ textAlign: 'center', fontWeight: 550, color: '#34C95E' }}>{"Welcome To Mind Play Game"}</DialogTitle>
        <DialogContent>
          <TypographyStyle>You sign in and play the quiz game. This quiz may contains brain questions if you like brain game then you must play.</TypographyStyle>

          <TypographyStyle style={{fontSize:'.9rem'}}>आप साइन इन करें और क्विज़ गेम खेलें। इस क्विज में दिमागी सवाल हो सकते हैं अगर आपको दिमागी खेल पसंद है तो आपको जरूर खेलना चाहिए।।</TypographyStyle>
        </DialogContent>
          <Box style={{height:'5rem',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError} />
          </Box>
      </Dialog>
    </Container>
  );
}