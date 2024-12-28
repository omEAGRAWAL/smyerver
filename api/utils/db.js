const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI||'mongodb+srv://Omagr:Password@cluster0.mfa3wse.mongodb.net/mywebstore?retryWrites=true&w=majority');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
