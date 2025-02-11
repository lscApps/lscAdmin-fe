import { SelectItem } from "../models/selectItem"

export class RecurringType{
    static FIXED: SelectItem = {id: 0, name: "Fixed"};
    static INSTALLMENT: SelectItem = {id: 1, name: "Installemnt"};


    static getAll(){
        return [
            this.FIXED,
            this.INSTALLMENT
        ]
    }
}