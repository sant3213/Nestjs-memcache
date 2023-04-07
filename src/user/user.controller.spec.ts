import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
  reset: jest.fn(),
}
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
          UserService,
          {
            provide: CACHE_MANAGER,
            useValue: mockCacheManager
          }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return the user from the UserService', async () => {
      // Arrange
      const user = 'Sant';

      jest.spyOn(userService, 'getUser').mockResolvedValueOnce(user);
      
      // Act
      const result = await controller.getUser();

      // Assert
      expect(result).toBe(user);
      expect(userService.getUser).toHaveBeenCalled();
    });
  });
});
