export class ProfileElses {
    firstName: string = '';
    lastName: string = '';
    username: string = '';

constructor(item: any){
    const keys = Object.keys(this);

    let validItems: ProfileElses = this;

    for (const key in item) {
        if (keys.includes(key)) { 
        validItems[`${key}`] = item[`${key}`];
    }
}
Object.assign(this, validItems);
}
}