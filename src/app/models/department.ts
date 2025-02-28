export class Department{
    id?: number;
    name?: string;
    manager?: string;

    constructor(name: string, manager: string){
        this.name = name;
        this.manager = manager;
    }

    setId(id: number){
        this.id = id;
    }

}