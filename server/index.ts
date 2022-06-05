import express from 'express';
import Server from './Server';

const app = express();
const port = parseInt(process.env.PORT || '') || 9000;

const server = new Server(app);
server.start(port);
