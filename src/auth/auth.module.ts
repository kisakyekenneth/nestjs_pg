import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: 1800 },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  // Export JwtStratgey and the entire Passport Module. There4 and service that users the auth.module enjoys the authorization
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
