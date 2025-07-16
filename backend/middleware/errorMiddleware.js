const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  let errorMessage = err.message;
  let errorsArray = null;

  if (err.name === "ValidationError") {
    errorMessage = "Error de validación de datos.";
    errorsArray = Object.values(err.errors).map((error) => error.message);
  } else if (err.name === "CastError" && err.kind === "ObjectId") {
    errorMessage = "ID de recurso inválido.";
  }

  res.json({
    message: errorMessage,
    errors: errorsArray,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`No Encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
