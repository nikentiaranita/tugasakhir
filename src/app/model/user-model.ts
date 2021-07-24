export interface User {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    desc?: string;
    birthday?: Birthday;
}

export interface Birthday {
    day?: number;
    month?: number;
    year?: number;
}