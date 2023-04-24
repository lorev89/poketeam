import { PrismaClient } from "@prisma/client"

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()

  return {
    props : { users }
  }
}
