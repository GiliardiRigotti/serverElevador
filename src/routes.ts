import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import { z } from "zod"
import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController"
import { CreateUserController } from "./useCases/createUser/CreateUserController"
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

export async function appRoutes(app:FastifyInstance){

    const authenticateUserController = new AuthenticateUserController()
    const createUserUseController = new CreateUserController()
    const refreshTokenUserController = new RefreshTokenUserController()
    
    app.post('/user', createUserUseController.handle)

    app.post('/login', authenticateUserController.handle)

    app.post('/refresh-token', refreshTokenUserController.handle)

    app.get('/notifications',async (request, response)=>{
        const authToken = request.headers.authorization
        const ensureAuth= await ensureAuthenticated(authToken)
        if(!ensureAuth){
            return response.code(401).send({message:"Token invalid"})
        }
        return response.send({message:"ok"})
    })

}

