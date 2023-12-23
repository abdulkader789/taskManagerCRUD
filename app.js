const express = require('express');
const app = express();
const router = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
app.use(express.static('./public'));
app.use(express.json());
app.use(notFound)
app.use('/api/v1/tasks', router)

// app.get('/ap1/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id');
// app.patch('/api/v1/tasks/:id');
// app.delete('/api/v1/tasks/:id')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT, console.log(`Server is running on port ${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()