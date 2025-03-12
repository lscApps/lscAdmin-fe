import { Record } from "./record";

export class ReportRequest{

    records?: Array<Record>;
    dtInit?: string;
    dtEnd?: string;
    type?: string; //Constants options EXCEL / PDF

    constructor( records: Record[], dtInit: string, dtEnd: string){
        this.records = records;
        this.dtInit = dtInit;
        this.dtEnd = dtEnd;
    }

}