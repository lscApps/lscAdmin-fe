export class Record{
    id?: number;
    description!: string;
    amount: number;
    date!: string;
    departmentId!: number;
    typeId!:number;
    expneseType?:string;


    constructor(description: string, amount: string, date: string, departmentId: number, typeId: number, expenseType?: string){
        this.description = description;
        this.amount = Number.parseFloat(amount)
        this.date = date;
        this.departmentId = departmentId;
        this.typeId = typeId;
        this.expneseType = expenseType
    }
}