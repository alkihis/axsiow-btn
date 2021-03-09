import { Router } from 'express';
import checkSession from '../checkSession';
import { v4 as uuid } from 'uuid';
import ButtonPusher from '../ButtonPusher';

declare module 'express-session' {
  interface Session {
    lastPushExpiresAt?: string;
    lastPushId?: string;
  }
}

const pushButtonRouter = Router();

pushButtonRouter.post('/push-button', checkSession, (req, res) => {
  if (req.session.lastPushExpiresAt) {
    const expiresAt = new Date(req.session.lastPushExpiresAt);

    if (expiresAt.getTime() > Date.now()) {
      return res.status(403).json({
        code: 1,
        message: 'Vous avez déjà appuyé sur le bouton récemment.',
      });
    }
  }

  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + (15 * 1000));

  const pushId = uuid();
  ButtonPusher.pushTheButton(pushId);

  req.session.lastPushExpiresAt = expireDate.toISOString();
  req.session.lastPushId = pushId;

  res.json({
    pushId,
  });
});

export default pushButtonRouter;
