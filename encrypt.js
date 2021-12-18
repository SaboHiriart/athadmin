const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = '';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv : iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}