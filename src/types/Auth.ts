export interface User {
    id: number;
    lastName: string;
    proofIncome?: any;
    address: string;
    email: string;
    birthday: Date;
    ine: string;
    noClient: string;
    name: string;
    phoneNumber: string;
    idAuthentication: number;
}

export interface LoginResponse {
    data: User;
    accessToken: string;
    refreshToken: string;
}