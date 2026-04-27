import Joi from "joi";

const createTransValidation = Joi.object({
    date: Joi.date().required(),
    amount : Joi.number().min(1).required(),
    description : Joi.string().allow(null).allow('').optional(),
    accountId : Joi.string().required(),
    categoryId : Joi.string().required(),
});

export { createTransValidation};