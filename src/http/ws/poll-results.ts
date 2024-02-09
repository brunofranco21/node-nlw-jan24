import { FastifyInstance } from "fastify/types/instance";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app:FastifyInstance) {
  app.get('/polls/:pollId/results', {websocket: true}, (connection, request) =>{
    //connection.socket.on('message', (message: string) => {
      // connection.socket.send('You sent: '+ message)

      // setInterval(() => {
      //   connection.socket.send('Heloo')
      // },500)
      //me inscrever  nas mensagens publicadas no canal com o ID da enquete ('pollId')
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      })

      const { pollId } = getPollParams.parse(request.params)

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message))
      })
    //})

  })
}


//pub/sub - Publish Subscribes