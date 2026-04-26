const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/********** Routes **********/
// Auth Routes
const authRoutes = require('./src/routes/authRoutes.js');
app.use('/api/auth' , authRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`ProLink Server is Running! 🚀 http://localhost:${port}`);
});
