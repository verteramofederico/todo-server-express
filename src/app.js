require('dotenv').config()

const express = require('express');
const path = require('path');

const routes = require('./Routes/IndexRouter')

const app = express();

app.use(express.json())

app.use(routes)

app.listen(process.env.Port || 3000)