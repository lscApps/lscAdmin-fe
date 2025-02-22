import { SelectItem } from "../models/selectItem";

export class RecordType{
    static INCOME: SelectItem = {id: 0, name:"Income"};
    static ONE_TIME: SelectItem = {id:1, name:"Expense"};
    static RECURRING: SelectItem ={id:2, name:"Scheduled Expense"};

    static getAll(){
        return [
            this.INCOME,
            this.ONE_TIME,
            this.RECURRING
        ]
    }

    static getById(id: number){
        for(let rType  of this.getAll()){
            if(rType.id == id)
                return rType
        }

        return undefined;
    }
}
