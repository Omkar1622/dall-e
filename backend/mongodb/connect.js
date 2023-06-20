import mongoose, { mongo } from "mongoose";

// useful when working with search functionality
const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    // connect to our database
    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));

    
}



export default connectDB;