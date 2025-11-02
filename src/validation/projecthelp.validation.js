import Joi from "joi";

// Validation schema
const projHelpSchema = Joi.object({
  data: Joi.string().max(50).required(),
  tag: Joi.string().length(2).required(),
});


export default projHelpSchema;