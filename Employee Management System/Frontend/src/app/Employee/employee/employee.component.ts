import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/Model/Employee-Model';
import { ApiService } from 'src/app/Services/api.service'; 
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  EmployeeModelobj !: EmployeeModel;
  employeedata: any;

  employeeName!:string;
  company!: string;
  designation!:string;
  ctc!:string;
  location!:string;


  constructor(private api: ApiService) { }

  Addform = new FormGroup({
    employeeName: new FormControl(''),
    company: new FormControl(''),
    designation: new FormControl(''),
    ctc: new FormControl(''),
    location: new FormControl('')
  });

  ngOnInit(): void {
    this.getAllEmployees();
  }

  /* Method for Adding Records */
  postEmployeeDetails() {
    this.employeeName = this.Addform.value.employeeName;
    this.company = this.Addform.value.company;
    this.designation = this.Addform.value.designation;
    this.ctc = this.Addform.value.ctc;
    this.location = this.Addform.value.location;
    this.EmployeeModelobj = new EmployeeModel(this.employeeName, this.company, this.designation, this.ctc, this.location);
    this.api.postEmployee(this.EmployeeModelobj)
      .subscribe(res => {
        alert("Data Added Successfully")
        this.Addform.reset();
        this.getAllEmployees();
      })
  }

  /*  Method for Getting Records */
  getAllEmployees() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeedata = res;
      })
  }
  /* Method For Deleting Record */
  delEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Data Deleted Successfully")
        this.getAllEmployees();
      })
  }

  onEdit(row: any) {
    this.EmployeeModelobj.id = row.id;
    this.Addform.controls['employeeName'].setValue(row.employeeName);
    this.Addform.controls['company'].setValue(row.company);
    this.Addform.controls['designation'].setValue(row.designation);
    this.Addform.controls['ctc'].setValue(row.ctc);
    this.Addform.controls['location'].setValue(row.location);
  }


  /* Method for Updating Records */
  updateEmployeeDetails() {
    this.EmployeeModelobj.employeeName = this.Addform.value.employeeName;
    this.EmployeeModelobj.company = this.Addform.value.company;
    this.EmployeeModelobj.designation = this.Addform.value.designation;
    this.EmployeeModelobj.ctc = this.Addform.value.ctc;
    this.EmployeeModelobj.location = this.Addform.value.location;
    this.api.updateEmployee(this.EmployeeModelobj,this.EmployeeModelobj.id)
      .subscribe(res => {
        alert("Data Updated Successfully");
        this.Addform.reset();
        this.getAllEmployees();
      })
  }

}
