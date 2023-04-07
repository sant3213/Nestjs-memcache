import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
//import { AppController } from './app.controller';

@Module({
  imports: [ 
    CacheModule.register({
      ttl: 20, // time to leave
      max: 1000, // amount of items that can be in cache
      isGlobal: true
    }),
    UserModule ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
