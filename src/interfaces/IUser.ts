export interface IUser {
    id: number;
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    image: string;
};

export interface IUserLoginRequest {
    username: string;
    password: string;
};
