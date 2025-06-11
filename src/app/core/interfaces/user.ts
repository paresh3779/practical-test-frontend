import { IResponse } from "./common";
import { Permission } from "./permission";
import { Role } from "./role";

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    permissions: Permission[];
    roles: Role[];
}
export interface IUserRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    password: string;
}

export interface IUserResponse extends IResponse {
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserLoginResponse extends IResponse {
    access_token: string;
    user_details: IUser;
    expires_at: string;
}