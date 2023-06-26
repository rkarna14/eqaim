import { ErrorRequestHandler } from "express";

const RespondError: ErrorRequestHandler = (err, _req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
};

export default RespondError;
