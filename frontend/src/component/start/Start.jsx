import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { QuizContext } from '../../context/context';
import {  styled } from '@mui/material';

const ButtonStyle=styled(Button)`
  color: #34C95E;
  border-color: #34C95E;
  border-width:2px;
  width:1.5rem;
  height:2rem;
  font-weight:550;
  &:hover{
    background-color:#34C95E;
    color:#fff;
  }
`
const DialogContentStyle=styled(DialogContentText)`
&>li{
  font-weight:bold;
  list-style:none;
  margin-top:.5rem;
}
`

export default function Start() {
  const { setGameState } = React.useContext(QuizContext);

  const handleClose = () => {
    setGameState('main')
  };

  return (
    <div>
        <Dialog
        open={true}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{textAlign:'center',fontWeight:550,color:'#34C95E'}} >{"Game Info"}</DialogTitle>
        <DialogContent>
          <DialogContentStyle id="alert-dialog-slide-description">
            <li>⏱ Total Time : 5 Minute</li>
            <li>📖 Total Question : 5 </li>
            <li>⚠ You will get only one chance.</li>
            <li>⚠ Once an option has been selected, it cannot be changed.</li>
            <li>⚠ The winner will be the one who solves more questions in less time.</li>
          </DialogContentStyle>
        </DialogContent>
        <DialogActions>
          <ButtonStyle style={{marginRight:'1rem'}} variant='outlined' onClick={handleClose}>Start</ButtonStyle>
        </DialogActions>
      </Dialog>
    </div>
  );
}