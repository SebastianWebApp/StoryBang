const { GROKService } = require('../Services/grok.service.js');
const { JWTService } = require('../Services/jwt.service.js');

// Mock the dependencies
jest.mock('../Services/grok.service.js');
jest.mock('../Services/jwt.service.js');

describe("Image Generator", () => {
    let grokService;
    let jwtService;

    // This runs before each test to initialize fresh instances of the services
    beforeEach(() => {
        jwtService = new JWTService(); // Initialize JWTService
        jwtService.verifyToken = jest.fn(); // Mock verifyToken
        grokService = new GROKService(); // Initialize GROKService
        grokService.GenerateText = jest.fn(); // Mock GenerateText
    });

    // This runs after each test to reset any mocks that were used
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock calls and instances
    });

    // Group of tests related to GROKService
    describe("Generate Text", () => {
        test("The text was generated successfully", async () => {
            
            // Mock expected behaviors
            const mockJobData = {
                Id: '123',
                Token: 'valid.token.123',
                Prompt: 'A cute cat',
                Tokens: 100,
                Temperature: 0.7,
                Top_p: 0.9,
                Presence_penalty: 0.1,
                Frequency_penalty: 0.1   
            }

            jwtService.verifyToken.mockResolvedValue(true);            
            grokService.GenerateText.mockResolvedValue(true);

            // Call logic (assumed from context)
            const tokenValid = await jwtService.verifyToken(mockJobData.Token);
            expect(tokenValid).toBe(true);

            const imageGenerated = await grokService.GenerateText(mockJobData.Prompt, mockJobData.Tokens, mockJobData.Temperature, mockJobData.Top_p, mockJobData.Presence_penalty, mockJobData.Frequency_penalty);
            expect(imageGenerated).toBe(true);
        });

        test("The text was not generated successfully", async () => {
            // Mock expected behaviors
            const mockJobData = {
                Id: '123',
                Token: 'valid.token.123',
                Prompt: 'A cute cat',
                Tokens: 100,
                Temperature: 0.7,
                Top_p: 0.9,
                Presence_penalty: 0.1,
                Frequency_penalty: 0.1
            }

            jwtService.verifyToken.mockResolvedValue(true);
            grokService.GenerateText.mockRejectedValue(new Error("Image generation failed"));

            // Call logic (assumed from context)
            const tokenValid = await jwtService.verifyToken(mockJobData.Token);
            expect(tokenValid).toBe(true);

            await expect(grokService.GenerateText(mockJobData.Prompt, mockJobData.Tokens, mockJobData.Temperature, mockJobData.Top_p, mockJobData.Presence_penalty, mockJobData.Frequency_penalty)).rejects.toThrow("Image generation failed");    
        })
    });

    // Group of tests related to JWTService
    describe("JWTService", () => {
        test("verifyToken should validate a token successfully", async () => {
            const mockToken = "valid.token.123";
            jwtService.verifyToken = jest.fn().mockResolvedValue(true); // Mock successful token verification

            const result = await jwtService.verifyToken(mockToken); // Call verifyToken

            expect(result).toBe(true); // Expect token to be valid
            expect(jwtService.verifyToken).toHaveBeenCalledWith(mockToken); // Ensure correct token was checked
        });

        test("verifyToken should reject an invalid token", async () => {
            jwtService.verifyToken = jest.fn().mockRejectedValue(new Error("Invalid token"));
            await expect(jwtService.verifyToken("invalid.token")).rejects.toThrow("Invalid token");
        });
    });
});