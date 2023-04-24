import TypeController from "@/controller/TypeController"
import AbilityController from "@/controller/AbilityController"
import { prisma } from "@/db"

export default class PokemonController {

    public static async create(pokemon: any, teamId: string) {
        pokemon.types = await TypeController.getOrCreateMany(pokemon.types)
        pokemon.abilities = await AbilityController.getOrCreateMany(pokemon.abilities)

        const pokemonObj = await  prisma.pokemon.create({
           data:{
            name:  pokemon.name,
            baseExperience: pokemon.baseExperience,
            types: {
                connect: pokemon.types.map((el:any)=>{return {id:el.id}})
            },
            abilities: {
                connect: pokemon.abilities.map((el:any)=>{return  {id:el.id}}),
            },
            sprite: pokemon.sprite,
            team: {
                connect: {
                   id: teamId
                }
            },
           }
        })
        return pokemonObj
    }

    public static async createMany(pokemon: any[], teamId: string) {
        const pokemonObjs = pokemon.map(async (pokemon) => {  return await this.create(pokemon, teamId) })
        return await Promise.all(pokemonObjs)
    }
}