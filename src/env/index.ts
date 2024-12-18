import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['pg', 'sqlite3']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const { success, data, error } = envSchema.safeParse(process.env)

if (success === false) {
  const message = 'Invalid environment variables!'
  console.error(message, error.format())
  throw new Error(message)
}

export const env = data
