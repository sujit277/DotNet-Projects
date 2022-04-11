export class EmployeeModel{
    id!:any;
    employeeName!:string;
    company!:string;
    designation!:string;
    ctc!:string;
    location!:string;

    constructor(employeeName:string,company:string,designation:string,ctc:string,location:string){
        this.employeeName = employeeName;
        this.company = company;
        this.designation = designation;
        this.ctc = ctc;
        this.location = location; 
    }
}