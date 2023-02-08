import { z } from "zod"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

class AuthenticateUserController{
    async handle(request: Request, response:Response){
        const createHabitBody = z.object({
            username: z.string(),
            password: z.string(),
        }) 

        const { username, password} = createHabitBody.parse(request.body)

        const authenticateUserUseCase = new AuthenticateUserUseCase()
        const token = await authenticateUserUseCase.execute({username,password})

        return token
    }
}
export {AuthenticateUserController}