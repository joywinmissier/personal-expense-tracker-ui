export interface Auth {
    userDetails : UserDetails[],
    authToken : string
}

export interface UserDetails {
    _id: string;
    name: string,
    age: number,
    country: string,
    email: string,
    gender: string,
}