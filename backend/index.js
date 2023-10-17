import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app=express();

//  middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1 : Allow all origins with default of cors(*)
app.use(cors());

// Option 2: use of custom origins 

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome to BOOK STORE')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error)
    })