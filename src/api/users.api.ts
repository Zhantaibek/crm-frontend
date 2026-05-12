import {client} from './client'
import type  {User , UpdateMeDto} from '@/types/user.types'

export const usersApi = {
    getMe : async () : Promise <User> => {
        const res = await client.get('/users/me')
        return res.data.data
    },
    updateMe : async(data : UpdateMeDto) : Promise <User> => {
        const res = await client.patch ('/users/me', data)
        return res.data.data
    },
    getAll : async () : Promise <User> => {
        const res = await client.get('/users')
        return res.data.data
    },
    getById : async (id : number) : Promise <User> => {
        const res = await client.get(`/users/${id}`)
        return res.data.data
    },
    delete : async (id : number ) : Promise <void> => {
        await client.delete(`/users/${id}`)

    }
}