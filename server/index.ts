import express from 'express';
import countRouter from './routes/getButtonPushCount';
import pushButtonRouter from './routes/pushButton';
import sendReasonRouter from './routes/sendReason';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Routes
app.use(pushButtonRouter);
app.use(sendReasonRouter);
app.use(countRouter);
// 404
app.use((_, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
