import { useState } from 'react';
import './App.css';
import Main from './component/Main/Main';
import { QuizContext } from './context/context';
import Form from './component/form/Form';
import Quiz from './component/quiz/Quiz';
import Start from './component/start/Start';
import End from './component/end/End';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './component/dashboard/Dashboard';
import AllQuiz from './component/allQuiz/AllQuiz';
import AllTopper from './component/allTopper/AllTopper';

function App() {
  const [question, setQuestion] = useState([]);
  const [counter, setCounter] = useState();
  const [gameState, setGameState] = useState("form");
  const [account, setAccount] = useState('');
  const [score,setScore]=useState(0)

  return (
    <GoogleOAuthProvider clientId='333316983490-s5eej0jph6vrtl2ue723668ogtrsvane.apps.googleusercontent.com'>
    <QuizContext.Provider value={{ question, setQuestion,gameState,setGameState,score,setScore ,counter,setCounter ,account, setAccount}}>
      {gameState === "main" && <Main/>}
      {gameState === "quiz" && <Quiz/>}
      {gameState === "form" && <Form/>}
      {gameState === "start" && <Start/>}
      {gameState === "end" && <End/>}
      {gameState === "dashboard" && <Dashboard/>}
      {gameState === "alltopper" && <AllTopper/>}
    </QuizContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
