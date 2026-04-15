import Joi from "joi";

const LoginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { LoginValidation };
