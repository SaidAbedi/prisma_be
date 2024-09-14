import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

interface TokenPayload {
    id: string
    firstName: string
    lastName: string
}

export const comparePassword = async (password:string, hashedPassword:string) => {
    return await bcrypt.compare(password, hashedPassword)
}

export const hashPassword = async (password:string) => {
    return await bcrypt.hash(password, 10)
}

export const generateToken = (payload:TokenPayload ) => {
    const token = jwt.sign({...payload}, process.env.JWT_SECRET)
    console.log(token)
    return token
}

export const protectRoute = (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        return res.status(401).send( 'Not authorized')
    }

    const [ , token] = bearer.split(' ')

    if(!token) {
        return res.status(401).send( 'Not valid token')
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send( 'Not valid token')
    }

}

