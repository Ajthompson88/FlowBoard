import express from 'express';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api/index.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

export default app;
