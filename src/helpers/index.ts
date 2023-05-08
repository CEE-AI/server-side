import crypto from 'crypto';
import bcrypt from 'bcrypt'

const SECRET = "BOSS BADDIE"
export const random = () => crypto.randomBytes(128).toString('base64')
export const authentication = (salt: string, password:string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}

