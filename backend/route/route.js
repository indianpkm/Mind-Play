import express from "express";
import { addUser, getUsers } from "../controller/user_controller.js";
import { addQuizData, getTopper } from "../controller/quiz_controller.js";

const route=express.Router();

route.post('/add',addUser)

route.get('/user',getUsers)

route.post('/quizdata',addQuizData)

route.get('/topper',getTopper)

export default route