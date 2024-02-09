import { fastify} from "fastify"
import { createPoll } from './routes/create-poll'
import { getPoll } from "./routes/get-poll"
import { voteOnPoll } from "./routes/vote-on-poll"
import cookie from "@fastify/cookie"
import websocket from "@fastify/websocket"
import { pollResults } from "./ws/poll-results"


const app = fastify()

app.register(cookie,{
  secret: "jovintech-node", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)


app.get('/ping', async (request, reply) => {
  return 'pong'
})

app.listen({port: 1986 }).then(() =>{
  console.log('HTTP server running!')
})