import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  /* Post API Request*/
  postEmployee(data:any){
    console.log(data);
    return this.http.post("https://localhost:7036/api/employee",data)  
  }

  /* Get API Request  */
  getEmployee(){
    return this.http.get("https://localhost:7036/api/employee") 
  }

  /* Delete API Request */
  deleteEmployee(id:any){
    return this.http.delete("https://localhost:7036/api/employee/"+id)
  }

  /* Put API Request */
  updateEmployee(data:any,id:any){
    console.log(data);
    return this.http.put("https://localhost:7036/api/employee/"+id,data)
  }

}
