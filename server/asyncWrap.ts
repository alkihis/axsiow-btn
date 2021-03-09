import { RequestHandler } from 'express';

export default function asyncWrap(handler: RequestHandler): RequestHandler {
  return (req, res, next) => Promise.resolve(handler(req, res, next))
    .catch(error => next(error || new Error()));
}
