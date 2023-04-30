import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    team: any,
    index: number,
    removeCallback : CallableFunction | undefined
}

const TeamCard: FunctionComponent<Props> = ({ index, team, removeCallback}) => (
    <div key={index}  className="m-top-6 relative grid md:grid-cols-9 grid-cols-1 m-auto md:min-w-[250px]  min-w-[100px] max-w-[70vw] rounded overflow-hidden shadow-lg bg-white hover:bg-grey-200 py-3 px-4">
        <div className="col-start-1 col-end-2 px-6 py-0 w-[30px] ">
            <h1 className="font-bold text-xl mb-2 text-transform: capitalize">
                {team.name}
            </h1>
        </div>
        <div className='md:col-start-3 md:col-end-8 grid grid-cols-2 md:grid-cols-6 gap-4'>
        {team.pokemon.map((pokemon : any, index : any) => {
            return (
            <div className = 'relative content-center'key={index} >
                <Image src={pokemon.sprite} alt = {pokemon.sprite} width={100} height={100}/>
                <span className=' content-center m-auto text-transform: capitalize'>{pokemon.name}</span>
                <div className="text-xs absolute -top-1 -left-1 px-2.5 py-0.5 bg-green-500 rounded-full">{pokemon.baseExperience}</div>
            </div>
            )})}
        </div >
        <div className ='md:col-start-9'>
            Total exp.
            <span className ='rounded-full font-bold text-xl bg-green-500'>
                {team.sumExperience}
            </span>
        </div>
        {/*<div className="absolute top-3 left-6 px-2.5 py-0.5 bg-green-500 rounded-full text-xs">Total exp: {item.baseExperience}</div>*/}
        <Link className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full text-xs" href={'/team/'+team.id+'/edit'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </Link>
    </div>

)

export default TeamCard