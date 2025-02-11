export class Record{
    id?: number;
    description!: string;
    amount: number;
    date!: string;
    departmentId!: number;
    recordType!:number; // 1 - Entry // 2- Recurrent Expenses // 3-Expense
    recurringType!: number; // 1-Fixed // 2-Installment
    initialMonth?: number; // 0 - 11 (1=Jan, 2=Fev...12=Dec)
    replicaCount?: number;


    constructor(
        description: string, 
        amount: string, 
        date: string, 
        departmentId: string, 
        recordType: string, 
        recurringType: string,
        initialMonth: string,
        replicaCount: number){
            this.description = description;
            this.amount = Number.parseFloat(amount)
            this.date = date;
            this.departmentId = Number.parseInt(departmentId);
            this.recordType = Number.parseInt(recordType);
            this.recurringType =  Number.parseInt(recurringType);
            this.initialMonth =  Number.parseInt(initialMonth);
            this.replicaCount = replicaCount;
    }
}