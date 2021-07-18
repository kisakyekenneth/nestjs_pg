import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  //User login
  //User login
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    //Finding if the provided userName exists in the database
    const user = await this.userRepository.findOne({ username });

    //If username exists then compare given 'password' with user.password in the DB this is done with bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      //if the user and password don't exist then use in-built method to throw error
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
