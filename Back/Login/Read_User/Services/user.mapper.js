export class UserMapper {
    static toUserProfile(userData, decryptedData) {
        return {
            Phone: decryptedData.data.decrypt.phone,
            Password: decryptedData.data.decrypt.password,
            Name: userData.Name,
            Image: userData.Image
        };
    }
}