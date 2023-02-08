import { DoneFuncWithErrOrRes, InjectOptions, RequestPayload } from 'fastify';
import { ReplyGenericInterface } from 'fastify/types/reply';
import { ReplyDefault } from 'fastify/types/utils';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticated(authToken: string){
        if(!authToken){
            return {
                message:"Token is missing"
            }
        }

        const [, token] = authToken?.split(" ")
        
        try {
            verify(token, "3fdbd2ee-a117-48cc-8c00-1ac5786ca1fe")
            return true;
        } catch (error) {
            return false
        }
    }
