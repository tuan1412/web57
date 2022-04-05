const HttpError = require('../common/httpError');

const validateInput = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = schema.validate(req[property]); 
    const valid = error == null; 
    
    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      console.log("error", message);
      throw new HttpError(422, message)
  } 
}}

module.exports = validateInput;