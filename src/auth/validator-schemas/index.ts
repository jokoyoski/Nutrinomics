import * as Joi from 'joi';
import { MIN_PWD_LEN } from 'src/constants';

const requiredStr = Joi.string().required();

export const SignUpSchema = Joi.object({
  firstname: requiredStr,
  lastname: requiredStr,
  language: requiredStr,
  email: requiredStr.email(),
  password: requiredStr.min(MIN_PWD_LEN),
});

export const SignInSchema = Joi.object({
  email: requiredStr.email(),
  password: requiredStr.min(MIN_PWD_LEN),
});
