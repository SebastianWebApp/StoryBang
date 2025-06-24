const { UserService } = require('../Services/user.service.js');
const { JWTService } = require('../Services/jwt.service.js');
const { DecryptionService } = require('../Services/decryption.service.js');

// Mock the dependencies
jest.mock('../Services/user.service.js');
jest.mock('../Services/jwt.service.js');
jest.mock('../Services/decryption.service.js');

describe('Read User', () => {
    let userService;
    let jwtService;
    let decryptionService;

    beforeEach(() => {
        // Set up mocks before each test
        mockDB = jest.fn();

        // Manually mock the methods of each service
        jwtService = new JWTService();
        jwtService.verifyToken = jest.fn();     

        decryptionService = new DecryptionService();
        decryptionService.decrypt = jest.fn();

        userService = new UserService(mockDB);
        userService.findUserById = jest.fn();
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('User read successfully', async () => {
        const mockJobData = {
            Id: '123',
            Password: 'vp1o3d12',
            Token: 'valid-token'
        };

        // Mock expected behaviors
        jwtService.verifyToken.mockResolvedValue(true);
        userService.findUserById.mockResolvedValue({
            Phone: 'dsefsdsd',
            Password: 'dsdsewaa',
            Name: 'John Doe',
            Image: 'image-url'
        });
        decryptionService.decrypt.mockResolvedValue({
            decryptPhone: '0987579898',
            decryptPassword: 'vp1o3d12'
        });   

        // Call logic (assumed from context)
        const tokenValid = await jwtService.verifyToken(mockJobData.Token);
        expect(tokenValid).toBe(true);
        expect(jwtService.verifyToken).toHaveBeenCalledWith(mockJobData.Token);

        // Simulate finding user by ID and sending password
        const findUserById = await userService.findUserById(mockJobData.Id);
        expect(userService.findUserById).toHaveBeenCalledWith('123');

        const descyptedData = await decryptionService.decrypt(findUserById.Phone, findUserById.Password);
        expect(decryptionService.decrypt).toHaveBeenCalledWith(findUserById.Phone, findUserById.Password);

        if( descyptedData.decryptPassword === mockJobData.Password) {
            console.log(`User ${findUserById.Name} found with phone ${descyptedData.decryptPhone} and password ${descyptedData.decryptPassword}`);
        } 
    });

    test('Invalid or expired token', async () => {
        jwtService.verifyToken.mockResolvedValue(false);

        const result = await jwtService.verifyToken('invalid-token');
        expect(result).toBe(false);
        expect(jwtService.verifyToken).toHaveBeenCalledWith('invalid-token');
    });

    test('Error recovering password', async () => {
        userService.findUserById.mockRejectedValue(new Error('Database error'));

        await expect(userService.findUserById("123")).rejects.toThrow('Database error');

        expect(userService.findUserById).toHaveBeenCalled();
    });
});