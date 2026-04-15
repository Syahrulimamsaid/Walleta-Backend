import Joi from "joi";

const createDebetValidation = Joi.object({
    amount : Joi.number().min(1).required(),
    description : Joi.string().allow(null).allow('').optional(),
    accountId : Joi.string().required(),
    categoryId : Joi.string().required(),
});

export { createDebetValidation};