import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db'
import PokemonController from '@/controller/PokemonController'
import CacheController from '@/controller/CacheController'
import TeamController from '@/controller/TeamController'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            throw new Error('Invalid request body')
        }

        const team = req.body.team
        const teamId = await TeamController.create(team)

        res.status(200).json({ data: {id: teamId}})

    } catch (error:any) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

