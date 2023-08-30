import * as Joi from 'joi';

export const EnvSchema = Joi.object({
  APP_ENV: Joi.string()
    .valid('develop', 'stage', 'production')
    .default('develop'),
  APP_PORT: Joi.number().required().example(3000),

  DB_TYPE: Joi.string().valid('mongodb').required().default('mongodb'),
  DB_HOST: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().required().default(27017),
  DB_USER: Joi.string().required().default(''),
  DB_DATABASE: Joi.string().required(),

  API_TOKEN: Joi.string().min(124).required(),
  AUTH_URL_BASE: Joi.string().uri(),
  NOTIFICATIONS_URL_BASE: Joi.string().uri(),
  TIME_MINUTES_ACCOUNT_CONFIRMATION: Joi.number(),
  TIME_MINUTES_RECOVERY_PASSWORD: Joi.number(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().required(),

  USER_HAVE_ACCOUNT_AVAILABLE: Joi.boolean().valid(true, false),
  RECOVERY_PASSWORD_AVAILABLE: Joi.boolean().valid(true, false),
  REGISTER_ME_AVAILABLE: Joi.boolean().valid(true, false),
});
