import { prisma } from '../db'

export default class AbilityController {

    public static async getOrCreate(ability: any){
        const abilityObj = await prisma.ability.upsert({
            where: {
                name: ability.name
            },
            update:{},
            create:{
                name: ability.name
            }
        })

        return abilityObj
    }

    public static async getOrCreateMany(abilities: any[]) {
        const abilityObjs = abilities.map(async (ability) => {  return await this.getOrCreate(ability) })
        return await Promise.all(abilityObjs)
    }
}