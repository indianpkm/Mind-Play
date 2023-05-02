import express from "express";
import Connection from "./db/db.js";
import route from "./route/route.js";
import cors from 'cors'
import bodyParser from "body-parser";

const PORT=process.env.PORT || 5000
const app=express()
app.use(cors())
Connection()

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))


app.use('/',route)

app.listen(PORT,()=>{
    console.log('server start ',PORT)
})