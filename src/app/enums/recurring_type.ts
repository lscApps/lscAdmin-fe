import { SelectItem } from "../models/selectItem"

export class RecurringType{
    static FIXED: SelectItem = {id: 1, name: "Fixed"};
    static INSTALLMENT: SelectItem = {id: 2, name: "Installemnt"};


    static getAll(){
        return [
            this.FIXED,
            this.INSTALLMENT
        ]
    }
}