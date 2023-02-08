import { prisma } from "../../lib/prisma"

interface INotification{
    title: string
    description: string
}
class CreateNotificationUseCase{
    async execute({title,description}:INotification){
        const today = new Date().toISOString()

        const notification = await prisma.notification.create({
            data:{
               created_at:today,
               title,
               description
            }
        })
        return notification
    }
}
export {CreateNotificationUseCase}