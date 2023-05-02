import { Box, styled } from '@mui/material'
import React from 'react'

const Container=styled(Box)`
width:100% ;
height:80% ;
display:flex ;
justify-content:center;
align-items:center;
font-size:2rem;
font-weight:550;
color:#8e8e8e;
`

const Loading = () => {
  return (
    <Container style={{}}>Loading...</Container>
  )
}

export default Loading