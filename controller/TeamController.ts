import CacheController from "./CacheController"
import PokemonController from "@/controller/PokemonController"

export default class TeamController{

    public static async list(type: string = '') {

        const cacheId = 'team:list_'+ type

        let teams = await CacheController.get(cacheId )
        if (teams != undefined && teams != null ) {
            return teams
        }

        let queryObj = {
            include:{
                pokemon: true,
            },
            orderBy: [
              {
                createdAt: 'desc',
              },
            ]
          }

        if (type != '') {
            queryObj.where = {
                pokemon: {
                    some:{
                        types: {
                            some: {
                                name: type
                            }
                        }
                    }
                }
            }
        }

        let teamQuery = await prisma.team.findMany(queryObj);

        teamQuery.forEach((team:any) => {
        let sumExp = 0
        team.pokemon.forEach((pokemon:any)=> {
            sumExp += pokemon.baseExperience
        });
        team.sumExperience = sumExp
        })

        teams = JSON.parse(JSON.stringify(teamQuery))
        CacheController.set(cacheId, teams)

        return teams
    }

    public static async create(team:any) {
        const teamObj = await prisma.team.create({
            data: {
                name: team.name
            }
        })

        const pokemon = await PokemonController.createMany(team.pokemon, teamObj.id)

        //todo invalidate by changed types
        await CacheController.invalidateMany(['team:list_'])
    }

    public static async update(team: any) {
        const oldIds = team.pokemon.filter((el:any) =>el.id != undefined).map((el:any)=>{return el.id})
        await prisma.pokemon.deleteMany({
            where:{
                    id: {
                      notIn: oldIds
                    },
                    teamId: team.id
                  },
        })
        const deletedPokemon = await prisma.pokemon.delete
        const pokemon = await PokemonController.createMany(team.pokemon.filter((el:any) =>el.id == undefined), team.id)

        const teamObj = await prisma.team.update({
            where: {
                id: team.id
             },
            data: {
                name: team.name,
            },
        })

        //todo invalidate by changed types
        await CacheController.invalidateMany(['team:list_'])

        return teamObj.id
    }
}