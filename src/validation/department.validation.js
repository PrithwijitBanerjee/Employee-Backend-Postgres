import Joi from "joi";

// Validation schema
const departmentSchema = Joi.object({
//   DeptCode: Joi.string().max(3).required().messages({
//     'string.max': 'Dept Code must not exceed 3 characters',
//     'any.required': 'Dept Code is required!!!!'
//   }),
  DeptName: Joi.string().max(50).required().messages({
    'string.max': 'Dept Name must not exceed 50 characters',
    'any.required': 'Dept Name is required!!!'
  }),
  DeptStat: Joi.string().length(3).required().messages({
    'string.length': 'Dept Status must be exactly 3 characters',
    'any.required': 'Dept Status is required!!!'
  }),
});

export default departmentSchema;