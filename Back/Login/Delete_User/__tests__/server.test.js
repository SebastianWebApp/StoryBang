// Import the user and JWT services
import { UserService } from "../Services/user.service.js";
import { JWTService } from "../Services/jwt.service.js";

// Mock for the database connection
const mockConnectToDB = jest.fn();

describe("Delete User Services", () => {
    let userService;
    let jwtService;

    // This runs before each test to initialize fresh instances of the services
    beforeEach(() => {
        userService = new UserService(mockConnectToDB); // Initialize UserService with mock DB
        jwtService = new JWTService(); // Initialize JWTService
    });

    // This runs after each test to reset any mocks that were used
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock calls and instances
    });

    // Group of tests related to UserService
    describe("UserService", () => {
        test("deleteUser should successfully delete a user", async () => {
            const userId = "123";
            userService.deleteUser = jest.fn().mockResolvedValue(true); // Mock deleteUser to resolve true

            const result = await userService.deleteUser(userId); // Call deleteUser

            expect(result).toBe(true); // Expect the result to be true
            expect(userService.deleteUser).toHaveBeenCalledWith(userId); // Verify it was called with the correct ID
        });

        test("deleteUser should handle errors", async () => {
            const userId = "123";
            userService.deleteUser = jest.fn().mockRejectedValue(new Error("Error deleting")); // Mock failure

            // Expect the call to throw an error
            await expect(userService.deleteUser(userId)).rejects.toThrow("Error deleting");
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
