import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }]
})
export class UserModule {}
