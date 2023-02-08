import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { compare } from "bcryptjs";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest{
    username: string
    password: string
}

class AuthenticateUserUseCase{
    async execute({username,password}:IRequest){
        
        const userAlreadyExist = await prisma.user.findFirst({
        where:{
            username
        }
        })

        if(!userAlreadyExist){
            throw new Error("User or password incorrect");     
        }

        const passwordMatch= await compare(password, userAlreadyExist.password)

        if(!passwordMatch){
            throw new Error("User or password incorrect");     
        }
        
        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(userAlreadyExist.id)
        await prisma.refreshToken.deleteMany({
            where:{
                userId: userAlreadyExist.id
            }
        })
        const generateRefreshToken = new GenerateRefreshToken()
        const refreshToken = await generateRefreshToken.execute(userAlreadyExist.id)

        return ({name: userAlreadyExist.name ,token, refreshToken})
    }
}
export{AuthenticateUserUseCase}