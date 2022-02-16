import type { SignInDto } from './signin.dto';

export type SignUpDto = SignInDto & {
  firstname: string;
  lastname: string;
};
