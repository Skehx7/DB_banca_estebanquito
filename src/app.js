import express from 'express';
import router from './routes/banco.routes.js';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.set('port',3000);
app.use(express.json());
app.use(router);

export default app;