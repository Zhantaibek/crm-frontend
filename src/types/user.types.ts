export interface User {
    id : number ,
    name : string ,
    email : string ,
    role : 'user' | 'admin',
    createdDt : string
}

export interface UpdateMeDto {
    name? : string ,
    email? : string ,
    password? : string
}

