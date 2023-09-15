//const express = require('express');
import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';
//import {connection} from './src/shared/db/connection.js';
import noteRoutes from './src/modules/notes/routes/note-routes.js';
import { createConnection } from './src/shared/db/connection.js';

const app = express(); // call the express function and get the app function
dotenv.config(); // read .env file and load env variables in process.env
app.use(cors());
//app.use(connection); // attach middleware
app.use(express.json());
// attach route as a middleware
app.use('/',noteRoutes);
//app.get('/',(req,res)=>res.send('Hi Client'));
console.log('After middleware....');
const server = app.listen(process.env.PORT || 1234,(err)=>{
    if(err){
        console.log(chalk.red.bold('Server Crash '), err);
    }
    else{
        console.log(chalk.green.bold('Server Up and Running '), 
        server.address().port);
        createConnection();
    }
})