const httpErrorMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
  DELETE: 204,
};
  
const mapStatusHTTP = (status) => httpErrorMap[status] || 500;
  
module.exports = mapStatusHTTP;