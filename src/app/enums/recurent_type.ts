import { SelectItem } from "../models/selectItem"

export class RecurrentType{
    static FIXED: SelectItem = {id: 1, name: "Fixed"};
    static INSTALLMENT: SelectItem = {id: 2, name: "Installment"};


    static getAll(){
        return [
            this.FIXED,
            this.INSTALLMENT
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