import dayjs from "dayjs";
import { prisma } from "../../lib/prisma"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

class RefreshTokenUserUseCase{

    async execute(refresh_token:string){

        const refreshToken = await prisma.refreshToken.findFirst({
            where:{
                id: refresh_token
            }
        })

        if(!refreshToken){
            throw new Error("Refresh token invalid");
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expireIn))

        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(refreshToken.userId)

        if(refreshTokenExpired){
            await prisma.refreshToken.deleteMany({
                where:{
                    userId: refreshToken.userId
                }
            })
            const generateRefreshTokeProvider = new GenerateRefreshToken()
            const newRefreshToken = await generateRefreshTokeProvider.execute(refreshToken.userId)
            
    
            return {token, refreshToken:newRefreshToken}
        }

        

        return {token}
    }
}

export {RefreshTokenUserUseCase}