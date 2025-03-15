const { StatusCodes, getReasonPhrase } = require("http-status-codes");

 const handleError = (err, res) => {
  let statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let errorName = err.name || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  let description = err.message || "An unexpected error occurred.";

  res.status(statusCode).json({
    code: statusCode,
    name: errorName,
    description: description,
  });
};
module.exports = {handleError};