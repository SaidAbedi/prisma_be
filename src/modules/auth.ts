import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string
    firstName: string
    lastName: string
}

export const generateToken = (payload:TokenPayload ) => {
    const token = jwt.sign({...payload}, process.env.JWT_SECRET)
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
        return res.status(401).send( 'Not valid token')
    }


    
}