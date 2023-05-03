import axios from 'axios'

const url='https://mind-play.onrender.com'

export const addUser=async(data)=>{
    try{
        await axios.post(`${url}/add`,data)
    }catch(err){
        console.log('Error while adding user' , err)
    }
}

export const getUser=async()=>{
    try{
        const response = await axios.get(`${url}/user`)
        return response.data
    }catch(err){
        console.log('Error while get user' , err)
    }
}

export const quizData=async(data)=>{
    try{
        await axios.post(`${url}/quizdata`,data)
        console.log('quiz data send')
    }catch(err){
        console.log('error while send quizdata : ',err)
    }
}

export const getTopper=async()=>{
    try{
        const response = await axios.get(`${url}/topper`)
        return response.data
    }catch(err){
        console.log('Error while get user' , err)
    }
}