import { SelectItem } from "../models/selectItem";

export class ReportType{
    static ANUAL: SelectItem = {id: 1, name:"Anual"};
    static MONTHLY: SelectItem = {id:2, name:"Monthly"};
    static CUSTOM: SelectItem ={id:3, name:"Custom"};

    static getAll(){
        return [
            this.ANUAL,
            this.MONTHLY,
            this.CUSTOM
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