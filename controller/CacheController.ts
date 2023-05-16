import { prisma } from "@/db"

export default class CacheController{

    public static async get(id:string) {
        const json =  await prisma.cache.findUnique({
            where:{
                id:id
            },
            select:{
                value: true
            }
        })

        console.log('FROM CACHE: id -->' +id)
        return json != null ? json.value : null
    }

    public static async invalidate(id:string){
        try{ await prisma.cache.delete({
            where: {
                id: id
            }
        })} catch(error) {
            return false
        }
    }

    public static async invalidateMany(ids:string[]){
        try {

            await prisma.cache.deleteMany({
                    where: {
                        id: {
                            in: ids
                        }
                    }

            });
        } catch (error) {
            console.log({ error })
         }

    }

    public static async set(id:string, value:JSON) {
        await prisma.cache.create({
            data:{
                id:id,
                value: value
            }
        })
    }
}