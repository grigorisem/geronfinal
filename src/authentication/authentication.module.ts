import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import {JwtModule} from '@nestjs/jwt'
import { AuthGuard } from './authentication.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.getOrThrow('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '12h'},
    }),
    inject: [ConfigService],
  }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AuthenticationModule {}