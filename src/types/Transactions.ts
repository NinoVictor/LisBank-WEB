export interface Transaction {
    id: number,
    concept: string,
    date: Date,
    amount: number,
    noTransaction: string,
    type: string,
    idAccount: number,
    idOrigin: number,
    origin: Origin
}

export interface Origin {
    id: number,
    name: string
}


export interface Transactions {
    data: Transaction[]
}