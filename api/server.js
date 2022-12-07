const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require ('path');
const cors = require ('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const listRouter = require("./routes/list");

const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://Branden:password12345@movieapi.r3tkhgh.mongodb.net/test";

mongoose.connect(DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', error => console.error(error))
db.once('open', () => console.log("Database Connection Eastablished"))

app.use(express.json())
app.use('/api/v1/list', listRouter )

app.use(express.static(path.join(__dirname, '../frontendcrud/build')));

app.get('/+', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontendcrud/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

