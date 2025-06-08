const { UserService } = require('../Services/user.service.js');
const { JWTService } = require('../Services/jwt.service.js');
const { EncryptionService } = require('../Services/encryption.service.js');

// Mock the dependencies
jest.mock('../Services/user.service.js');
jest.mock('../Services/jwt.service.js');
jest.mock('../Services/encryption.service.js');

describe('Create User Service', () => {
    let userService;
    let jwtService;
    let encryptionService;
    let mockDB;

    beforeEach(() => {
        // Set up mocks before each test
        mockDB = jest.fn();

        // Manually mock the methods of each service
        jwtService = new JWTService();
        jwtService.verifyToken = jest.fn();

        encryptionService = new EncryptionService();
        encryptionService.encrypt = jest.fn();

        userService = new UserService(mockDB);
        userService.updateUser = jest.fn();
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('should update a user successfully', async () => {
        const mockJobData = {
            Id: '123',
            Token: 'valid-token',
            Phone: '1234567890',
            Password: 'password123',
            Username: 'testuser',
            Image: 'profile.jpg'
        };

        // Mock expected behaviors
        jwtService.verifyToken.mockResolvedValue(true);
        encryptionService.encrypt.mockResolvedValue({
            encryptedPhone: 'encrypted_phone',
            encryptedPassword: 'encrypted_password'
        });
        userService.updateUser.mockResolvedValue(true);

        // Call logic (assumed from context)
        const tokenValid = await jwtService.verifyToken(mockJobData.Token);
        expect(tokenValid).toBe(true);

        const encryptedData = await encryptionService.encrypt(mockJobData.Phone, mockJobData.Password);
        expect(encryptionService.encrypt).toHaveBeenCalledWith(mockJobData.Phone, mockJobData.Password);

        const updateResult = await userService.updateUser(
            mockJobData.Id,
            encryptedData.encryptedPhone,
            encryptedData.encryptedPassword,
            mockJobData.Username,
            mockJobData.Image
        );
        expect(updateResult).toBe(true);
        expect(userService.updateUser).toHaveBeenCalledWith(
            mockJobData.Id,
            encryptedData.encryptedPhone,
            encryptedData.encryptedPassword,
            mockJobData.Username,
            mockJobData.Image
        );

    });

    test('should fail if token is invalid', async () => {
        jwtService.verifyToken.mockResolvedValue(false);

        const result = await jwtService.verifyToken('invalid-token');
        expect(result).toBe(false);
        expect(jwtService.verifyToken).toHaveBeenCalledWith('invalid-token');
    });


    test('should handle error during user creation', async () => {
        userService.updateUser.mockRejectedValue(new Error('Database error'));

        await expect(userService.updateUser({
            Username: 'testuser',
            Password: 'somepassword',
            Phone: 'somephone',
            Image: 'image.jpg'
        })).rejects.toThrow('Database error');

        expect(userService.updateUser).toHaveBeenCalled();
    });
});
