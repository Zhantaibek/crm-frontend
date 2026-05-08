export interface Product {
    id : number ,
    name : string ,
    price : number,
    createdAt : string 
}

export interface CreateProductDto {
    name : string ,
    price : number
}

export interface UpdateProductDto {
    name? : string ,
    price? : number
}