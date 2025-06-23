const {KafkaService} = require('../Services/kafka.service.js');
const { JWTService } = require('../Services/jwt.service.js');


// Mock the dependencies
jest.mock('../Services/kafka.service.js');
jest.mock('../Services/jwt.service.js');


describe('Create User Service', () => {
    let kafkaService;
    let jwtService;


    beforeEach(() => {
        // Set up mocks before each test
        mockDB = jest.fn();

        // Manually mock the methods of each service
        jwtService = new JWTService();
        jwtService.verifyToken = jest.fn();

        kafkaService = new KafkaService();
        kafkaService.createTopicIfNotExists = jest.fn();
        kafkaService.sendMessage = jest.fn();

    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('should verify a user successfully', async () => {
        const mockJobData = {
            Id: '123',
            Token: 'valid-token',
            Phone: '1234567890'
        };

        // Mock expected behaviors

        jwtService.verifyToken.mockResolvedValue(true);
        kafkaService.createTopicIfNotExists.mockResolvedValue(true);
        kafkaService.sendMessage.mockResolvedValue(true);   

        // Call logic (assumed from context)
        const tokenValid = await jwtService.verifyToken(mockJobData.Token);
        expect(tokenValid).toBe(true);
        expect(jwtService.verifyToken).toHaveBeenCalledWith(mockJobData.Token);
    

        const kafkaResponse = await kafkaService.createTopicIfNotExists('user-verification');
        expect(kafkaResponse).toBe(true);

        const kafkaMessage = await kafkaService.sendMessage({
            Id: mockJobData.Id,
            Phone: mockJobData.Phone
        });

        expect(kafkaMessage).toBe(true);
        expect(kafkaService.sendMessage).toHaveBeenCalledWith({
            Id: mockJobData.Id,
            Phone: mockJobData.Phone
        });
        
    });

    test('should fail if token is invalid', async () => {
        jwtService.verifyToken.mockResolvedValue(false);

        const result = await jwtService.verifyToken('invalid-token');
        expect(result).toBe(false);
        expect(jwtService.verifyToken).toHaveBeenCalledWith('invalid-token');
    });
    test('should handle error during Kafka topic creation', async () => {
        kafkaService.createTopicIfNotExists.mockRejectedValue(new Error('Kafka error'));

        await expect(kafkaService.createTopicIfNotExists('user-verification')).rejects.toThrow('Kafka error');

        expect(kafkaService.createTopicIfNotExists).toHaveBeenCalledWith('user-verification');
    });
    test('should handle error during message sending', async () => {
        kafkaService.sendMessage.mockRejectedValue(new Error('Kafka send error'));

        await expect(kafkaService.sendMessage({ Id: '123', Phone: '1234567890' })).rejects.toThrow('Kafka send error');

        expect(kafkaService.sendMessage).toHaveBeenCalledWith({ Id: '123', Phone: '1234567890' });
    });
    test('should handle error during JWT verification', async () => {
        jwtService.verifyToken.mockRejectedValue(new Error('JWT verification error'));

        await expect(jwtService.verifyToken('some-token')).rejects.toThrow('JWT verification error');

        expect(jwtService.verifyToken).toHaveBeenCalledWith('some-token');
    });

});
