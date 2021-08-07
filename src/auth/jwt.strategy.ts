import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
// import { JwtPayload } from 'jsonwebtoken';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

/**
 * Strategy is just an injectable class
 * This strategy should be added into the module file under providers
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //With in this class we need to fetch users from the DB, hence need to use the repo
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    /**
     * Since JwtStrategy is a derived class from PassportStrategy,
     * And it has a constructor, then we need to call "super" to initialize the parent class.
     * We need to use the secret key which was generated in the "auth.modules.ts" file
     *jwtfromRequest:- Tells Passport how to extract the token
     */
    super({
      secretOrKey: 'mySecretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    //Destructure our payload interface to get username
    const { username } = payload;
    //Now grab user from the db. the user is of type "User" entity
    const user: User = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }

    //Passport will inject this returned user into the request object of our controller
    return user;
  }
}
