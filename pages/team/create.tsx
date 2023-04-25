import {useCallback, useState } from 'react';
import Router from 'next/router';
import PokemonCard from '../../components/PokemonCard'

function CreateForm(props) {
  const [teamName, setTeamName] = useState('');
  const [formItems, setFormItems]  = useState([])

  async function submit (event:any){
    event.preventDefault();

    if (!teamName) {
      alert('Please enter Team name.')
      return false
    }

    if (formItems.length < 1) {
      alert('Please enter at leat 1 Pokèmon.')
      return false
    }

    const team = {
      name: teamName,
      pokemon: formItems
    }

    const response = await fetch('/api/team/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        team: team,
      }),
    })

    if (response.status === 200) {
      alert('Team created!')
      Router.push("/team/list");
    }
  }

  const removeItem = useCallback((index:number, event:any) => {
    let data = [...formItems];
    data.splice(index, 1)
    setFormItems(data)
    event.preventDefault();
  },[formItems])

  async function addItem (){
    if (formItems.length < 6) {
      //todo: call https://pokeapi.co/api/v2/pokemon-species/?limit=0 ->count
      const rand = Math.floor(Math.random() * 1010) + 1
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+rand)
      const jsonResponse = await response.json()

      const pokemon = {
        name: jsonResponse.name,
        baseExperience: jsonResponse.base_experience ?? 0,
        types: jsonResponse.types.map((el:any) => {return {name:el.type.name}} )?? [],
        abilities: jsonResponse.abilities.map((el:any) => {return {name:el.ability.name}} )?? [],
        sprite:jsonResponse.sprites.front_default ?? ''
      }
      setFormItems([...formItems, pokemon])
    }
  }

  return (
    <div className="App">
      <div className='grid p-8 justify-center items-center h-screen '>
        <form className='' onSubmit={submit}>
          <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' id='teamName' name= "teamName" value={teamName} type='text' minLength={1} required aria-label='email address' placeholder='Enter Team name'  onChange={(event) =>setTeamName(event.target.value)}/>
          <div className="border grid grid-cols-1 md:grid-cols-3 gap-8 justify-between">
            {formItems.map((item, index) => {
                return(
                <PokemonCard key={index} index={index} pokemon={item} removeCallback = {removeItem}/>
                )
            })}
          </div>
        </form>
      </div>
      <div className="absolute bottom-16 right-16 h-16 w-16 ...">
        <button disabled={formItems.length >= 6} className='bg-red-600 hover:bg-red-700 duration-300 text-white shadow p-2 rounded disabled:opacity-30' onClick={addItem}>
          Gotta catch&apos;em all
        </button>
        <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded'  onClick={submit}>
          Save Team
        </button>
      </div>
    </div>
  );
}

export default CreateForm;