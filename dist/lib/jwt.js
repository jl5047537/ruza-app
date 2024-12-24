import jwt from 'jsonwebtoken';
var JWT_SECRET = process.env.JWT_SECRET;
export function createJwtToken(userId) {
    var payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}
export function verifyJwtToken(token) {
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
