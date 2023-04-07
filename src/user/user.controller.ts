import { CacheTTL, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor) // It caches all of our get routes only and will cache them base on the defaults we specified in your cache module
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @CacheTTL(10)
    @CacheKey('cache_user')
    async getUser() {
        return await this.userService.getUser();
    }
}

// We don't actually even trigger the code in our routes here, we're just going to return the cached respoonse from the original call