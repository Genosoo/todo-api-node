import Joi from "joi";

export const todoSchema = Joi.object({
    userId: Joi.string()
        .required()
        .messages({
            'any.required': 'User ID is required'
        }),

    title: Joi.string()
        .trim()
        .min(1)
        .max(225)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 1 character long',
            'string.max': 'Title must be at most 225 characters long'
        }),

    completed: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'Completed must be a boolean'
        })
})