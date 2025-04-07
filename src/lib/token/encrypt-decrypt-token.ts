import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY || '0123456789abcdef0123456789abcdef'; // 32-byte fixed key
const IV_LENGTH = 16; // AES block size (16 bytes)

// Encrypt function
export function encryptToken(email: string, role: {id: number, value: string}[], time = Date.now() +  10 * 60 * 1000) {
    const data = JSON.stringify({ email, role, time });
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'utf8'), iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted; // Append IV with encrypted data
}

// Decrypt function
export function decryptToken(token: string) {
    try {
        const iv = Buffer.from(token.substring(0, IV_LENGTH * 2), 'hex'); // Extract IV (first 32 chars)
        const encryptedData = token.substring(IV_LENGTH * 2); // Remaining is encrypted data

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'utf8'), iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return JSON.parse(decrypted);
    } catch {
        throw new Error('Invalid Token');
    }
}
