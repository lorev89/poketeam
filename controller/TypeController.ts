
export default class TypeController {

    public static async list() {
        const typeQuery = await prisma.type.findMany({
            orderBy: [
              {
                createdAt: 'desc',
              },
            ]
          });

          return JSON.parse(JSON.stringify(typeQuery))
    }
    public static async getOrCreate(type: any){
        const typeObj = await prisma.type.upsert({
            where: {
                name: type.name
            },
            update:{},
            create:{
                name: type.name
            }
        })

        return typeObj
    }

    public static async getOrCreateMany(types: Type[]) {
        const typeObjs = types.map(async (type) => {  return await this.getOrCreate(type) })

        return await Promise.all(typeObjs)
    }

}
