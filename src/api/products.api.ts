import {client} from './client'
import type { Product , CreateProductDto , UpdateProductDto} from '@/types/product.types'

export const productsApi = {
    getAll : async () : Promise<Product[]> => {
        const res = await client.get('/products')
        return res.data.products
    },

    getById: async (id : number) : Promise <Product> => {
        const res = await client.get(`/products/${id}`)
        return res.data.product
    },
    create: async (data : CreateProductDto) : Promise <Product> => {
        const res = await client.post('/products', data)
        return res.data.product
    },
    update : async (id : number ,data : UpdateProductDto) : Promise <Product> => {
        const res = await client.post (`/products/${id}`, data)
        return res.data.product
    },
    delete : async (id : number) : Promise <void> => {
        await client.delete(`/products/${id}`)
    }
}