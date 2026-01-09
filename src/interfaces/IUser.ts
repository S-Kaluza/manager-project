interface IUser {
    email: string;
    name: string;
    surname: string;
    companyId: string;
}

export interface IRegisterCredentials {
    email: string;
    password: string;
    name: string;
    surname: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IAuthenticateResults {
    token: string;
    expires: string;
}

export default IUser;