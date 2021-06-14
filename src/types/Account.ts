export interface Account {
    id: number;
    clabe: string;
    createdDate: Date;
    number: string;
    availableBalance: number;
    idClient: number;
}

export interface DebitAccount {
    id: number;
    account: Account;
}

export interface CreditAccount {
    id: number;
    annuity: number;
    maxCredit: number;
    closingDate: Date;
    paymentdueDate: Date;
    monthlyPayment: number;
    minimumPayment: number;
    account: Account;
}

export interface Account2 {
    id: number;
    clabe: string;
    createdDate: Date;
    number: string;
    availableBalance: number;
    idClient: number;
}

export interface Accounts {
    debitAccounts: DebitAccount[];
    creditAccounts: CreditAccount[];
}