import { hash } from "bcryptjs"
import { prisma } from "../../lib/prisma"

interface IUser{
    username:string
    name:string
    password:string
    expoToken:string
    level:number
}

class CreateUserUseCase{
    async execute({ username, name, password, expoToken, level}:IUser){
        const today = new Date().toISOString()

          const passwordHash = await hash(password,8)

          const userAlreadyExist = await prisma.user.findFirst({
            where:{
                username
            }
          })

          if(userAlreadyExist){
            throw new Error("User already exist");     
          }

        const user = await prisma.user.create({
            data:{
               username,
               name,
               expoToken,
               created_at:today,
               password:passwordHash,
               level,
            }
        })

        return user
    }
}
export{CreateUserUseCase}