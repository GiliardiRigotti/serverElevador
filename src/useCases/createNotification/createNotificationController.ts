import { z } from "zod"
import { CreateNotificationUseCase } from "./createNotificationUseCase"

class CreateNotificationController{
    async handle(request:Request){
        const createHabitBody = z.object({
            title: z.string(),
            description: z.string()
        }) 

        const { title, description } = createHabitBody.parse(request.body)

        const createNotificationUseCase = new CreateNotificationUseCase()

        const notification = await createNotificationUseCase.execute({title, description})

        return notification
    }
}
export {CreateNotificationController}