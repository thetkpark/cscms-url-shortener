import { customAlphabet } from 'nanoid/async'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6)

export const generateToken = () => {
    return nanoid()
}