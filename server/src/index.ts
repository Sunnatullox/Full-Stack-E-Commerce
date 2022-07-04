import  path  from 'path';
import  express from "express";
import cors from 'cors';
import router from "./routes/index";
import errorHandler from './middleware/ErrorHandlingMiddleware'
import fileUpload = require("express-fileupload")
import process = require('process');
import fs from 'fs'


const app = express(); 
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Error middleware in the latest processing
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT , () =>{
    console.log("SERVER RUNNING ON  PORT " + PORT);
})

