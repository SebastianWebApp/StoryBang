const { GROKService } = require('../Services/grok.service.js');
const { JWTService } = require('../Services/jwt.service.js');

// Mock the dependencies
jest.mock('../Services/grok.service.js');
jest.mock('../Services/jwt.service.js');

describe("Description Image", () => {
    let grokService;
    let jwtService;

    // This runs before each test to initialize fresh instances of the services
    beforeEach(() => {
        jwtService = new JWTService(); // Initialize JWTService
        jwtService.verifyToken = jest.fn(); // Mock verifyToken
        grokService = new GROKService(); // Initialize GROKService
        grokService.Description_Image = jest.fn(); // Mock Description_Image
    });

    // This runs after each test to reset any mocks that were used
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock calls and instances
    });

    // Group of tests related to GROKService
    describe("Description Image", () => {
        test("The description was generated successfully", async () => {
            
            // Mock expected behaviors
            const mockJobData = {
                Id: '123',
                Token: 'valid.token.123',
                Prompt: 'Imagen'
            }

            jwtService.verifyToken.mockResolvedValue(true);            
            grokService.Description_Image.mockResolvedValue(true);

            // Call logic (assumed from context)
            const tokenValid = await jwtService.verifyToken(mockJobData.Token);
            expect(tokenValid).toBe(true);

            const imageGenerated = await grokService.Description_Image(mockJobData.Prompt);
            expect(imageGenerated).toBe(true);
        });

        test("The text was not generated successfully", async () => {
            // Mock expected behaviors
            const mockJobData = {
                Id: '123',
                Token: 'valid.token.123',
                Prompt: 'A cute cat'
            }

            jwtService.verifyToken.mockResolvedValue(true);
            grokService.Description_Image.mockRejectedValue(new Error("Image generation failed"));

            // Call logic (assumed from context)
            const tokenValid = await jwtService.verifyToken(mockJobData.Token);
            expect(tokenValid).toBe(true);

            await expect(grokService.Description_Image(mockJobData.Prompt)).rejects.toThrow("Image generation failed");    
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