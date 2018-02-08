const formatErrorResponse = err => new Error(`Error ${err.code.$value} : ${err.label.$value}`);

module.exports = formatErrorResponse;
