import { Router } from 'express';
import ButtonPusher from '../ButtonPusher';

const countRouter = Router();

countRouter.get('/count', (_, res) => {
  res.json({
    count: ButtonPusher.items.count,
  });
});

export default countRouter;

