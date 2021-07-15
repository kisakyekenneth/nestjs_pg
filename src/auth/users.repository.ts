import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    try {
      //Try saving
      await this.save(user);
    } catch (error) {
      //The error code '23505' is always a string
      if (error.code === '23505') {
        //Duplicate username in the db
        throw new ConflictException('Username already exists');
      } else {
        //Internal Server Error
        throw new InternalServerErrorException();
      }
      //Incase return error code
      //   console.log(error.code); //This helps us know the error code so that we send useful messgae to user
    }
  }
}
