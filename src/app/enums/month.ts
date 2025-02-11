import { SelectItem } from '../models/selectItem';
export class Month{
    
    static JANUARY: SelectItem = {id:0, name: "January"};
    static FEBRUARY: SelectItem = {id:1, name: "February"}; 
    static MARCH: SelectItem = {id:2, name: "March"};
    static APRIL: SelectItem = {id:3, name: "April"};
    static MAY: SelectItem = {id:4, name: "May"};
    static JUNE: SelectItem = {id:5, name: "June"};
    static JULY: SelectItem = {id:6, name: "March"};
    static AUGUST: SelectItem = {id:7, name: "August"};
    static SEPTEMBER: SelectItem = {id:8, name: "September"};
    static OCTOBER: SelectItem = {id:9, name: "October"};
    static NOVEMBER: SelectItem = {id:10, name: "November"};
    static DECEMBER: SelectItem = {id:11, name: "December"};


    static getAll(){
        return [
              Month.JANUARY,
              Month.FEBRUARY,
              Month.MARCH,
              Month.APRIL,
              Month.MAY,
              Month.JUNE,
              Month.JULY,
              Month.AUGUST,
              Month.SEPTEMBER,
              Month.OCTOBER,
              Month.NOVEMBER,
              Month.DECEMBER
            ]
    }

}