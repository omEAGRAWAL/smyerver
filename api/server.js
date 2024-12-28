// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello, Vercel!');

// });




// module.exports = app; // Export the app

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// }
// );
const app = require('./app');
const connectDB = require('./utils/db');
require('dotenv').config();
//cors

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
