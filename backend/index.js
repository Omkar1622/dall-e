// we can use the same import and export statement as in react, by adding 
// "type": "module", in package.json file

import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';



// allows us to pool our environment variables from our dotenv file
dotenv.config();

// initialize our express application 
const app = express();

// add additional middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


// Routes

app.get('/', async ( req, res ) => {
    res.send('Hello from MidJourney');
})



const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }


}

startServer();


