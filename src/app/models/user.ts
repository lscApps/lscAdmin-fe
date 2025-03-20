export class User{
    username?: string;
    password?: string;
    token?: string;

    constructor(
        username: string,
        password: string){
            this.username = username;
            this.password = password;
    }


    getUsername(){
        return this.username;
    }

    getPassword(){
        return this.password;
    }

    getToken(){
        return this.token;
    }
}
