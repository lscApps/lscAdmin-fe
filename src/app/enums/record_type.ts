import { SelectItem } from "../models/selectItem";

export class RecordType{
    static INCOME: SelectItem = {id: 0, name:"Income"};
    static ONE_TIME: SelectItem = {id:1, name:"One-Time"};
    static RECURRING: SelectItem ={id:2, name:"Recurring"};

    static getAll(){
        return [
            this.INCOME,
            this.ONE_TIME,
            this.RECURRING
        ]
    }
}