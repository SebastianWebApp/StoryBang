import { NotificationService } from "./notification.service.js";
import { DecryptionService } from "./decryption.service.js";
import { UserService } from "./user.service.js";

export class VerificationService {
    static async verifyUser(userData) {
        try {
            const users = await UserService.findUserById(userData.Id);

            if (users.length > 0) {
                try {
                    const decryptedData = await DecryptionService.decryptData(
                        users[0].Phone,
                        users[0].Password
                    );

                    if (decryptedData.data.decrypt.password === userData.Password) {
                        await NotificationService.sendNotification(
                            userData.Id,
                            true,
                            "The user exist"
                        );
                    } else {
                        await NotificationService.sendNotification(
                            userData.Id,
                            false,
                            "The password is incorrect."
                        );
                    }
                } catch (error) {
                    await NotificationService.sendNotification(
                        userData.Id,
                        false,
                        "Error decrypting your information"
                    );
                }
            } else {
                await NotificationService.sendNotification(
                    userData.Id,
                    false,
                    "The user does not exist"
                );
            }
        } catch (error) {
            await NotificationService.sendNotification(
                userData.Id,
                false,
                "Error processing job"
            );
        }
    }
}