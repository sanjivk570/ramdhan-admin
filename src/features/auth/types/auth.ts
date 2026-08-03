export interface User{
    uuid: string,
    first_name: string,
    last_name: string | null,
    full_name: string,
    email: string,
    is_active: boolean,
    mobile: string
}

export interface LoginRequest{
    email: string,
    password: string,
}

export interface LoginResponse {
    success: boolean,
    message: string,
    data: {
        token: string,
        user: User,
    };
}