// /validation/userValidation.ts

import Joi from 'joi';

// Define Joi schema for user validation
export const userSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(1)
        .max(225)
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 1 character long',
            'string.max': 'Username must be at most 225 characters long'
        }),
    firstname: Joi.string()
        .trim()
        .min(1)
        .max(225)
        .optional()
        .messages({
            'string.min': 'Firstname must be at least 1 character long',
            'string.max': 'Firstname must be at most 225 characters long'
        }),
    lastname: Joi.string()
        .trim()
        .min(1)
        .max(225)
        .optional()
        .messages({
            'string.min': 'Lastname must be at least 1 character long',
            'string.max': 'Lastname must be at most 225 characters long'
        }),
    email: Joi.string()
        .trim()
        .email()
        .min(1)
        .max(225)
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
            'string.min': 'Email must be at least 1 character long',
            'string.max': 'Email must be at most 225 characters long'
        }),
    password: Joi.string()
        .trim()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        })
});

