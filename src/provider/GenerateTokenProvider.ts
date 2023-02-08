import { sign } from "jsonwebtoken"

class GenerateTokenProvider{
    async execute(userId: string){
        const token = sign({}, "3fdbd2ee-a117-48cc-8c00-1ac5786ca1fe",{
            subject: userId,
            expiresIn: "20s"
        })
        return token
    }
}
export{GenerateTokenProvider}