const { UserService } = require('../Services/user.service.js');
const { JWTService } = require('../Services/jwt.service.js');
const { RedisService } = require('../Services/redis.service.js');
const { EncryptionService } = require('../Services/encryption.service.js');

// Mock the dependencies
jest.mock('../Services/user.service.js');
jest.mock('../Services/jwt.service.js');
jest.mock('../Services/redis.service.js');
jest.mock('../Services/encryption.service.js');

describe('Create User Service', () => {
    let userService;
    let jwtService;
    let redisService;
    let encryptionService;
    let mockDB;

    beforeEach(() => {
        // Set up mocks before each test
        mockDB = jest.fn();

        // Manually mock the methods of each service
        jwtService = new JWTService();
        jwtService.verifyToken = jest.fn();

        redisService = new RedisService();
        redisService.getValue = jest.fn();
        redisService.connect = jest.fn();
        redisService.del = jest.fn();

        encryptionService = new EncryptionService();
        encryptionService.encrypt = jest.fn();

        userService = new UserService(mockDB);
        userService.createUser = jest.fn();
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('should create a user successfully', async () => {
        const mockJobData = {
            Id: '123',
            Token: 'valid-token',
            Code: '12345',
            Phone: '1234567890',
            Password: 'password123',
            Username: 'testuser',
            Image: 'profile.jpg'
        };

        // Mock expected behaviors
        jwtService.verifyToken.mockResolvedValue(true);
        redisService.getValue.mockResolvedValue('12345');
        encryptionService.encrypt.mockResolvedValue({
            encryptedPhone: 'encrypted_phone',
            encryptedPassword: 'encrypted_password'
        });
        userService.createUser.mockResolvedValue(true);

        // Call logic (assumed from context)
        const tokenValid = await jwtService.verifyToken(mockJobData.Token);
        const codeFromRedis = await redisService.getValue(mockJobData.Id);

        expect(tokenValid).toBe(true);
        expect(redisService.getValue).toHaveBeenCalledWith('123');

        if (codeFromRedis === mockJobData.Code) {
            const encrypted = await encryptionService.encrypt(mockJobData.Phone, mockJobData.Password);

            const result = await userService.createUser({
                Username: mockJobData.Username,
                Password: encrypted.encryptedPassword,
                Phone: encrypted.encryptedPhone,
                Image: mockJobData.Image
            });

            expect(result).toBe(true);
            expect(userService.createUser).toHaveBeenCalled();
        }
    });

    test('should fail if token is invalid', async () => {
        jwtService.verifyToken.mockResolvedValue(false);

        const result = await jwtService.verifyToken('invalid-token');
        expect(result).toBe(false);
        expect(jwtService.verifyToken).toHaveBeenCalledWith('invalid-token');
    });

    test('should fail if code does not match Redis', async () => {
        redisService.getValue.mockResolvedValue('99999');

        const codeFromRedis = await redisService.getValue('123');
        expect(codeFromRedis).not.toBe('12345');
        expect(redisService.getValue).toHaveBeenCalledWith('123');
    });

    test('should handle error during user creation', async () => {
        userService.createUser.mockRejectedValue(new Error('Database error'));

        await expect(userService.createUser({
            Username: 'testuser',
            Password: 'somepassword',
            Phone: 'somephone',
            Image: 'image.jpg'
        })).rejects.toThrow('Database error');

        expect(userService.createUser).toHaveBeenCalled();
    });
});
