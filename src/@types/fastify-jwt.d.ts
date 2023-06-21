import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    // payload: {} // payload type is used for signing and verifying
    user: {
      id: number
      name: string
      age: number
      sub: string
      role: 'ADMIN' | 'MEMBER'
    } // user type is return type of `request.user` object
  }
}
