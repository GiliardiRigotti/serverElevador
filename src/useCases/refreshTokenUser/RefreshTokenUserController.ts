import { z } from "zod"
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase"

class RefreshTokenUserController{
    async handle(request:Request){
        const createBody = z.object({
            refresh_token: z.string(),
        }) 

        const { refresh_token } = createBody.parse(request.body)

        const refreshTokenUserUseCase = new RefreshTokenUserUseCase()
        const token = refreshTokenUserUseCase.execute(refresh_token)

        return token

    }
}
export{RefreshTokenUserController}