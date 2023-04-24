import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Pokemon from '../models/Pokemon'

type Props = {
    pokemon: Pokemon,
    index: number,
    removeCallback : any
}

const PokemonCard: FunctionComponent<Props> = ({ index, pokemon, removeCallback}) => (
  <div>
    <div key={index}>
    {/*pokemoncard component here*/}
    <div className="relative md:min-w-[250px]  min-w-[300px] min-h-[340px] rounded overflow-hidden shadow-lg bg-white hover:bg-grey-200 py-3">
        <Image className="w-1/2 m-auto" src ={pokemon.sprite} alt={pokemon.name} width={150} height={150}></Image>
        <hr></hr>
        <div className="px-6 py-0">
            <h1 className="font-bold text-xl mb-2 text-transform: capitalize">{pokemon.name}</h1>
        </div>
        <div className="px-6 pt-0 pb-0">
            {pokemon.types.map((type:any, index: number) => {
            return(
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">{type.name}</span>
            )})}
        </div>
        <div className="px-6 py-4">
            <ul className="px-6 list-disc marker:text-gray-500" title='Abilities'>
            <h2 className=" text-l  ">Abilities</h2>
            {pokemon.abilities.map((ability:any, index: number) => {
            return(
                <li key={index}>{ability.name}</li>
            )})}
            </ul>
        </div>
        <div className="absolute top-3 left-6 px-2.5 py-0.5 bg-green-500 rounded-full text-xs">exp: {pokemon.baseExperience}</div>
        <button className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs" onClick={(event) => {removeCallback(index,event)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </button>
    </div>



    </div>
  </div>
)

export default PokemonCard