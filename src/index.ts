import express from 'express';
import http, { createServer } from 'http';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import router from './router/index';
import users from './router/users';


const app = express();

const port = 8701;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.get('/products', async (req:express.Request, res:express.Response) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const AUTH_API = 'http://localhost:8701/auth';

app.use(compression());
app.use(bodyParser.json());
app.use(cookieparser());

app.use('/users', users);
app.use('/', router())

const server = http.createServer(app);

app.get('/', (req:express.Request, res:express.Response) => res.send("yeah men"))
server.listen(port,()=>{ console.log('server runing on port '+ port)})

const Mongod_db = 'mongodb+srv://chijiokeihedioha:Domain001@cluster0.9a8xxrz.mongodb.net/?retryWrites=true&w=majority'
mongoose.Promise = Promise;
mongoose.connect(Mongod_db)
mongoose.connection.on('connected', () => console.log('connected to database'));
mongoose.connection.on('error', (error) => console.log(error));