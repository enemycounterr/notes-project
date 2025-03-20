import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        request?.body
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_SECRET')!
    });
  }
 
  async validate(payload: TokenPayload) {
    console.log("from validate " + payload.userId);
    return this.userService.getUserById(payload.userId);
  }
}