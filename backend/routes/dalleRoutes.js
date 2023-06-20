import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';



dotenv.config();

const router = express.Router();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// create an instance of openai
var openai = new OpenAIApi(configuration);


router.route('/').get((req, res) => {
    res.send('Helllo from MidJourney..!');
});


router.route('/').post( async (req, res) => {
    try {
        // post req will contain the prompt text which will be converted into image
        const { prompt } = req.body;

        // sending it to the openai_api to get the desired image
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });


        // we need to get the image out of it (aiResponse)
        const image = aiResponse.data.data[0].b64_json;

        // sending it back to the frontend
        res.status(200).json({ photo: image });

    } catch (error) {
        console.log(error);
        // 500 Internal Server Error
        res.status(500).send(error?.response.data.error.message);
    }
});

export default router;

