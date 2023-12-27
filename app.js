const express = require('express');
const app = express();
const router = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const cors = require('cors');

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/tasks', router)


app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/ap1/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id');
// app.patch('/api/v1/tasks/:id');
// app.delete('/api/v1/tasks/:id')
const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()