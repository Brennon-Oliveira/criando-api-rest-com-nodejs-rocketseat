import { FastifyReply, FastifyRequest } from 'fastify'

export const checkSesionIdExists = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
