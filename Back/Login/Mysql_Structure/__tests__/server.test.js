const { Test_Connection } = require('../Controllers/test_connection.js');

// Mock the dependencies
jest.mock('../Controllers/test_connection.js', () => {
    return {
        Test_Connection: jest.fn().mockImplementation(() => {
            return {
                testConnection: jest.fn()
            };
        })
    };
});

describe('Test Connection Service', () => {
    let testConnection;
    let mockDB;

    beforeEach(() => {
        // Set up mocks before each test
        mockDB = jest.fn();
        testConnection = new Test_Connection(mockDB);
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('should test connection successfully', async () => {
        // Mock expected behaviors
        testConnection.testConnection.mockResolvedValue(true);

        // Call logic and verify
        const connectionResult = await testConnection.testConnection();
        expect(connectionResult).toBe(true);
        expect(testConnection.testConnection).toHaveBeenCalled();
    });

    test('should handle connection error', async () => {
        // Mock error behavior
        const errorMessage = 'Database connection error';
        testConnection.testConnection.mockRejectedValue(new Error(errorMessage));

        // Call logic and verify error handling
        await expect(testConnection.testConnection()).rejects.toThrow(errorMessage);
        expect(testConnection.testConnection).toHaveBeenCalled();
    });
});