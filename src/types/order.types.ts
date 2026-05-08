export interface OrderProduct {
    id : number ,
    orderId : number,
    productId : number ,
    product : {
        id : number,
        name : string , 
        price : number
    }
}

export interface Order {
    id : number ,
    userId : number,
    createAt : string ,
    products : OrderProduct []
}

export interface CreateOrderDto {
    productIds : number []
}