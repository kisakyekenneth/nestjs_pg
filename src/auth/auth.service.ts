import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {} //JwtService is used for signing tokens

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  //User login, returning an object of access token of type string
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    //Destructure the authCredentialsDto and get the username and password
    const { username, password } = authCredentialsDto;

    //Finding if the provided userName exists in the database
    const user = await this.userRepository.findOne({ username });

    //If username exists then compare given 'password' with user.password in the DB this is done with bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
      //creating a payload of type JwtPayload which is an interface we defined
      const payload: JwtPayload = { username };

      //Using the payload generated to sign a token used for access. It's of type String
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      //if the user and password don't exist then use in-built method to throw error
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
