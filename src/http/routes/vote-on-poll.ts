import { FastifyInstance } from "fastify";
import z, { number } from "zod";
import { randomUUID } from "node:crypto";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";
import { voting } from "../../utils/voting-pub-sub";

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request:any, reply:any) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid()
    })
    
    const voteOnPollParams = z.object({
      pollId: z.string().uuid()
    })

    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    let { sessionId } = request.cookies

    if (sessionId) {
      const userPreviousVotesOnPoll = await prisma.vote.findUnique({
        where:{
          pollId_sessionId:{
            pollId,
            sessionId
          }
        }
      })

      if (userPreviousVotesOnPoll && userPreviousVotesOnPoll.pollOptionId != pollOptionId){
        //apaga voto anterior
        //cria um novo voto
        
        await prisma.vote.delete({
          where:{
            id: userPreviousVotesOnPoll.id
          }
        })

        const votes = await redis.zincrby(pollId,-1,userPreviousVotesOnPoll.pollOptionId)
        
        voting.publish(pollId,{
          pollOptionId: userPreviousVotesOnPoll.pollOptionId,
          votes: Number(votes),
        })
      } else if (userPreviousVotesOnPoll){
        return reply.status(400).send({message:'Você já votou nesta enquete.'})
      }

    }

    if (!sessionId){
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId,{
        path:'/',
        maxAge: 60 * 60 * 24 * 30, //= 30 dias
        signed: true,
        httpOnly: true, 
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId
      }
    })
   
    const votes = await redis.zincrby(pollId,1,pollOptionId)

    voting.publish(pollId,{
      pollOptionId,
      votes: Number(votes),
    })
    
    return reply.status(201).send()
  })
  
}