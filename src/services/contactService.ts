import { Contact } from '../model';

const fakeData : Array<Contact> = [
    new Contact(1, 'Jon Snow', 35, '55 99999-99990', 'jonsnow@hbo.com'),
    new Contact(2, 'Cersei Lannister', 42, '55 99999-99991', 'cerseil@hbo.com'),
    new Contact(3, 'Jaime Lannister', 45, '55 99999-99992', 'jaimel@hbo.com'),
    new Contact(4, 'Arya Stark', 16, '55 99999-99993', 'aryastark@hbo.com'),
    new Contact(5, 'Melisandre', undefined, '55 99999-99994', 'melisandre@hbo.com'),
    new Contact(6, 'Ferrara Clifford', 44, '55 99999-99995', 'ferraracli@hbo.com'),
    new Contact(7, 'Rossini Frances', 36, '55 99999-99996', 'rossfr@hbo.com'),
    new Contact(8, 'Harvey Roxie', 65, '55 99999-99997', 'harveyr@hbo.com'),
    new Contact(9, 'Khal Drogo', 43, '55 99999-99998', 'khaldrogo@hbo.com')
];

const pageSize = 5;

const getRandomMs = (minSec : number, maxSec: number) => {
    const sec = Math.random() * (minSec - maxSec) + minSec;
    return sec * 1000;
};

const delay = async (ms: number) => {
    await new Promise(resolve => setTimeout(resolve, ms)).then(()=>{});
};

export type ContactData = {
    pageContacts: Array<Contact>;
    totalContacts: number;
}

export default class ContactService{

    private static initStorageIfNeeds(){
        if (!localStorage.getItem('contacts')){
            const json = JSON.stringify(fakeData);
            localStorage.setItem('contacts', json);
        }
    }

    private static getData() : Array<Contact>{
        this.initStorageIfNeeds();
        const strData = localStorage.getItem('contacts');
        if (strData){
            const jsonData = JSON.parse(strData);
            const data = jsonData.map((d:any)=>{
                return new Contact(d.id, d.name, d.age, d.phone, d.email);
            });
            return data;
        }
        return new Array<Contact>();
    }

    public static async findPage(page: number) : Promise<ContactData>{
        const ms = getRandomMs(1, 2);
        await delay(ms);
        const data = this.getData();
        const float = data.length / pageSize;
        let pages = Math.trunc(data.length / pageSize);
        if (float > pages){
            pages++;
        }
        const start = pageSize * page;
        const end =  start + pageSize;
        return {
            pageContacts: data.slice(start, end),
            totalContacts: data.length
        };
    }

    public static getContactPage(contact: Contact) : number{
        const data = this.getData();
        const ids = data.map((c : Contact)=>{
            return c.id;
        });
        const index = ids.indexOf(contact?.id);
        if (index >= 0){
            const page = Math.trunc(index / 5);
            return page;
        }
        return 0;
    }

    public static async insert(contact: Contact) : Promise<number>{
        const ms = getRandomMs(1, 2);
        await delay(ms);
        const data = this.getData();
        contact.id = data.length;
        data.push(contact);
        const json = JSON.stringify(data);
        localStorage.setItem('contacts', json);
        return contact.id || 0;
    }

    public static async update(contact: Contact){
        const ms = getRandomMs(1, 2);
        await delay(ms);
        const data = this.getData();
        const newData = data.map((c: Contact)=>{
            if (c.id !== contact.id){
                return c;
            }else{
                return contact;
            }
        });
        const json = JSON.stringify(newData);
        localStorage.setItem('contacts', json);
    }

    public static async delete(contact: Contact){
        const ms = getRandomMs(1, 2);
        await delay(ms);
        const data = this.getData();
        const newData = data.filter((c: Contact)=>{
            if (c.id !== contact.id){
                return true;
            }else{
                return false;
            }
        });
        const json = JSON.stringify(newData);
        localStorage.setItem('contacts', json);
    }

}