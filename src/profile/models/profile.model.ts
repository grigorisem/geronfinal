
export class Profile {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    username: string = '';

constructor(item: any){
    const keys = Object.keys(this);

    let validItems: Profile = this;

    for (const key in item) {
        if (keys.includes(key)) { 
        validItems[`${key}`] = item[`${key}`];
    }
}
Object.assign(this, validItems);
}
}