import { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import TeamCard from '@/components/TeamCard';
import TeamController from '@/controller/TeamController';
import TypeController from '@/controller/TypeController';

export const getStaticProps = async () => {

  const teams = await TeamController.list()
  const types = await TypeController.list()

  return {
    props: {teams,types}
  };
};

function Teams({ teams, types}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [teamList,setTeams] = useState(teams)
  const [selectedType, setSelectedType] = useState('');
  let options = [{value:'',text:'--select type--'}]
  options = options.concat(types.map(type=>{return {value: type.name, text:type.name}}))

   async function handleChange (event){
    const selectValue = event.target.value;
    const response = await fetch('/api/team/list?'+ new URLSearchParams({
      type: event.target.value,
    }))

    if (response.status === 200) {
      const jsonResponse = await response.json()
      setTeams(jsonResponse.data.teams)
      setSelectedType(selectValue)
    }
  };

  return (
    <div>
      <div className='relative py-4 grid grid-cols-5 gap-8 justify-between mb-4'>
        <div className='col-start-2 col-end-3 w-56'>
          Filter team by Pokèmon type
          <select  value={selectedType} onChange={handleChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
          </select>
        </div>

      </div>
      <div className="relative  grid grid-cols-1 md:grid-cols-1 gap-8 justify-between">
        {teamList.map((team : any, index : any) => {
          return (
              <TeamCard key={index} index={index} team={team} removeCallback ={undefined}/>
          )
        })}
      </div>
    </div>
  )
}

export default Teams