import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
}
describe('UserService', () => {
  let service: UserService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should cache user and return the correct value', async () => {
      // Arrange
      (mockCacheManager.set).mockResolvedValueOnce(undefined);
      (mockCacheManager.get).mockResolvedValueOnce({ key: 32 });

      // Act
      const result = await service.getUser();

      // Assert
      expect(result).toBe('Sant');
      expect(mockCacheManager.set).toHaveBeenCalledWith('cached_user', { key: 32 });
      expect(mockCacheManager.get).toHaveBeenCalledWith('cached_user');
    });
  });
});
