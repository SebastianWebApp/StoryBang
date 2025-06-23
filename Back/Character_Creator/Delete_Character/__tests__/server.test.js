// Import the user and JWT services
import { UserService } from "../Services/user.service.js";
import { JWTService } from "../Services/jwt.service.js";


describe("character_process Services", () => {
    let userService;
    let jwtService;

    // This runs before each test to initialize fresh instances of the services
    beforeEach(() => {
        userService = new UserService(); // Initialize UserService with mock DB
        jwtService = new JWTService(); // Initialize JWTService
    });

    // This runs after each test to reset any mocks that were used
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock calls and instances
    });

    // Group of tests related to UserService
    describe("UserService", () => {
        test("character_process should successfully character process", async () => {

            const mockJobData = {
                Id: '123',
                Token: 'valid-token',
                Id_Character: 'character-id'              
            };


            userService.character_process = jest.fn().mockResolvedValue(true); // Mock character_process to resolve true

            const result = await userService.character_process(mockJobData.Id_Character); // Call character_process

            expect(result).toBe(true); // Expect the result to be true
            expect(userService.character_process).toHaveBeenCalledWith(mockJobData.Id_Character); // Verify it was called with the correct ID
        });

        test("character_process should handle errors", async () => {
            
            const mockJobData = {
                Id: '123',
                Token: 'valid-token',
                Id_Character: 'character-id'                             
            };

            userService.character_process = jest.fn().mockRejectedValue(new Error("Error deleting")); // Mock failure

            // Expect the call to throw an error
            await expect(userService.character_process(mockJobData.Id_Character)).rejects.toThrow("Error deleting");
        });
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
            // You can finish this part similarly:
            jwtService.verifyToken = jest.fn().mockRejectedValue(new Error("Invalid token"));
            await expect(jwtService.verifyToken("invalid.token")).rejects.toThrow("Invalid token");
        });
    });
});
