import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  ConfigurationsModule,
  ConfigurationsService,
} from './../configurations';
import { UsersModule } from './../users';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    ConfigurationsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigurationsModule],
      useFactory: async (configurationsService: ConfigurationsService) => {
        return {
          secret: configurationsService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(configurationsService.get('JWT_EXPIRATION_TIME')
              ? {
                  expiresIn: Number(
                    configurationsService.get('JWT_EXPIRATION_TIME'),
                  ),
                }
              : {}),
          },
        };
      },
      inject: [ConfigurationsService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
