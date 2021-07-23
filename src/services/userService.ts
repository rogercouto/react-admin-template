import { User } from '../model';

const getRandomMs = (minSec : number, maxSec: number) => {
    const sec = Math.random() * (minSec - maxSec) + minSec;
    return sec * 1000;
};

const delay = async (ms: number) => {
    await new Promise(resolve => setTimeout(resolve, ms)).then(()=>{});
};

export default class UserService{

    public static async login(email: string, password: string) : Promise<User | null>{
        const ms = getRandomMs(1, 2);
        await delay(ms);
        if (email === 'admin@template.com' && password === 'admin'){
            const user = new User(email, 'Administrator', password);
            const strUser = JSON.stringify(user);
            localStorage.setItem('user', strUser);
            return user;
        }
        return null;
    }

    public static getCurrentUser(){
        const strUser = localStorage.getItem('user');
        if (strUser){
            const json = JSON.parse(strUser);
            return new User(json.email, json.name, json.password);
        }
        return null;
    }

    public static logout(){
        localStorage.removeItem('user');
    }
    

}