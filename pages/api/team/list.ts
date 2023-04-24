import type { NextApiRequest, NextApiResponse } from 'next'
import TeamController from '@/controller/TeamController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            throw new Error('Invalid request method')
        }

        const type = req.query.type ?? ''
        const teams = await TeamController.list(type)

        return res.status(200).json({ data: {teams}})
    } catch (error:any) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }

}