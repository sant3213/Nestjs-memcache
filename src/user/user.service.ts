import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async getUser() {
        this.cacheManager.set('cached_user', { key: 32 });
        // this.cacheManager.del('cached_user');
        // this.cacheManager.reset(); Deletes everything inside of the cache
        const cacheUser = await this.cacheManager.get('cached_user');
        return 'Sant';
    }
}
