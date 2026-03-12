import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'express';
import { router } from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running' });
});

app.use('/api', router);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };

