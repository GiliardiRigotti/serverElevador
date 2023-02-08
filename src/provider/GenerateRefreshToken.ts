import dayjs from "dayjs"
import { prisma } from "../lib/prisma"

class GenerateRefreshToken{
    async execute(userId: string){
        const expireIn = dayjs().add(15,"hour").unix()

        const generateRefreshToken = await prisma.refreshToken.create({
            data:{
                userId,
                expireIn
            }
        })

        return generateRefreshToken;
    }
}

export {
    GenerateRefreshToken
}