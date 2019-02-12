import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import routers from './routes';
import config from './config';
import path from 'path';
var cookieParser = require('cookie-parser');

if (!process.env.JWT_SECRET) {
    const err = new Error('No JWT_SECRET in env variable');
    console.error(err);
}

const app = express();

mongoose.connect(config.mongoose.uri, { useMongoClient: true })
    .catch(err => console.error(err));

mongoose.Promise = global.Promise;

app.use("/public", express.static('public'));

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit : '50mb'}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routers);


app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
}); 

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, () => {
    console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
});
