import {client} from './client'
import type {Order , CreateOrderDto} from '@/types/order.types'

export const ordersApi = {
    create : async (data : CreateOrderDto) : Promise <Order> => {
        const res = await client.post ('/orders/', data)
        return res.data
    },
    getAll : async () : Promise <Order[]> => {
        const res = await client.get('/orders')
        return res.data
    },
    getMy : async () : Promise <Order[]> => {
        const res = await client.get('/orders/my')
        return res.data
    },
    getById : async (id : number) : Promise <Order> => {
        const res = await client.get(`/orders/${id}`)
        return res.data
    },
    delete : async (id : number) : Promise <void> => {
        await client.delete(`/orders/${id}`)
    }

}