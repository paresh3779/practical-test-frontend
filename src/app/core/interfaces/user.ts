import { IResponse } from "./common";

export interface IUserRequest {
    fisrt_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    password: string;
}

export interface IUserResponse extends IResponse{
}