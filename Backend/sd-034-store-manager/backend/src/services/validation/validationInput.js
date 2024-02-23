const { nameValid } = require('./schemas');

const validationNewProduct = (name) => {
  const { error } = nameValid.validate(name);
  if (error) {
    return {
      status: 'INVALID_VALUE',
      data: { message: error.message.replace('value', 'name') },
    };
  }
};

module.exports = {
  validationNewProduct,
  
};