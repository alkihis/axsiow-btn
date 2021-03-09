import { Router } from 'express';
import checkSession from '../checkSession';
import ButtonPusher from '../ButtonPusher';

const sendReasonRouter = Router();

sendReasonRouter.post('/send-reason', checkSession, (req, res) => {
  const pushId = req.body.pushId;
  const reason = req.body.reason;

  if (!reason || typeof reason !== 'string') {
    return res.status(400).json({
      error: 3,
      message: 'Spécifiez une raison pour l\'enregistrer.',
    });
  } else if (!pushId || typeof pushId !== 'string') {
    return res.status(400).json({
      error: 4,
      message: 'Vous devez préciser le pushId.',
    });
  } else if (!ButtonPusher.pushExists(pushId)) {
    return res.status(400).json({
      error: 5,
      message: 'Ce pushId n\'existe pas.',
    });
  }

  ButtonPusher.addComment(pushId, {
    type: reason,
    createdAt: new Date().toISOString(),
  });

  res.json({
    saved: true,
  });
});

export default sendReasonRouter;
