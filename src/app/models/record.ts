import { create } from "domain";

export class Record{
    id?: number;
    description!: string;
    amount: number;
    date!: string;
    departmentId!: number;
    recordType!:number; // 0 - INCOME // 1-ONE_TIME  // 2-RECURRING
    recurringType!: number; // 1-Fixed // 2-Installment
    recurringCount?: number;
    status!: number; // 0- INACTIVE // 1- ACTIVE
    created!: string;


    constructor(
        description: string,
        amount: string,
        date: string,
        departmentId: string,
        recordType: string,
        recurringType: string,
        recurringCount: number,
        status: number,
        created: string){
            this.description = description;
            this.amount = Number.parseFloat(amount)
            this.date = date;
            this.departmentId = Number.parseInt(departmentId);
            this.recordType = Number.parseInt(recordType);
            this.recurringType =  Number.parseInt(recurringType);
            this.recurringCount = recurringCount;
            this.status = status;
            this.created = created;
    }
}
