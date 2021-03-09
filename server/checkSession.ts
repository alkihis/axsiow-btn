import { RequestHandler } from "express";

const checkSession: RequestHandler = function checkSession(req, res, next) {
  if (!req.cookies['axsiow.session']) {
    return res.status(401).json({
      error: 2,
      message: 'Unauthentificated session.',
    });
  }

  next();
};

export default checkSession;
