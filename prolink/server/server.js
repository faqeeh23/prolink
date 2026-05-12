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


// Project Routes
const projectRoutes = require('./src/routes/projectRoutes.js');
app.use('/api/projects' , projectRoutes)

app.post('/api/projects/generate' , (req, res) => {
    res.json({ message : "تم استلام طلب إنشاء المشروع بنجاح "})
})

// Error Middleware
const errorMiddleware = require('./src/middleware/errorMiddleware.js');
app.use(errorMiddleware);


// Start the server
app.listen(port, () => {
    console.log(`ProLink Server is Running! 🚀 http://localhost:${port}`);
});