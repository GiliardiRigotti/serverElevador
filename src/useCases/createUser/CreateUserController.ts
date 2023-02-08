import { z } from "zod"
import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController{
    async handle(request:Request){
        const createHabitBody = z.object({
            name: z.string(),
            username: z.string(),
            password: z.string(),
            expoToken: z.string(),
            level: z.number(),
        }) 

        const { name, username, password, expoToken, level } = createHabitBody.parse(request.body)

        const createUserUseCase = new CreateUserUseCase()

        const user = await createUserUseCase.execute({username,name,password,expoToken, level})

        return user
    }
}
export{CreateUserController}