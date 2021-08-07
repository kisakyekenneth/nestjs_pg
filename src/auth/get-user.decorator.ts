import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    //Get actual request body whenever the request comes in
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
