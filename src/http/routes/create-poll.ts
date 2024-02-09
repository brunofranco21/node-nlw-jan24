import { FastifyInstance } from "fastify"
import z from "zod"
import { prisma } from "../../lib/prisma"

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request:any, reply:any) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
      
    })
    
    const { title, options } = createPollBody.parse(request.body)
  
    const poll = await prisma.poll.create({
      data:{
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return {title: option}
            })  
          }
        }
      }
    })

    // await prisma.pollOption.createMany({
    //   data: options.map(option => {
    //     return {title: option, pollId: poll.id}
    //   })
    // })
    
    return reply.status(201).send( { pollId : poll.id})
  })
  
}