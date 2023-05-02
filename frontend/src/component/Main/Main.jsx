import React, { useContext, useEffect } from 'react'
import { Questions } from '../../context/questions';
import { QuizContext } from '../../context/context';
import Quiz from '../quiz/Quiz';

const Main = () => {
    
    const {question,setQuestion}=useContext(QuizContext)
    useEffect(()=>{
      if (Questions && Questions.length > 0) {
        //Shuffle questions array
        const shuffled = Questions.sort(() => 0.5 - Math.random());
        //Take 2 random questions array
        let questionsArray = shuffled.slice(0, 5);
        setQuestion(questionsArray)
      }
    },[setQuestion])
    
  return (
    <Quiz/>
  )
}

export default Main