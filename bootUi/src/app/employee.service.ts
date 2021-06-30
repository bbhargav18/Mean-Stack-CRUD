import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee } from './employee'


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee!: Employee;
  employees!: Employee[];

  baseURL = 'http://localhost:9595/employees';

  constructor(public http : HttpClient) { }

  getEmployee(){
    return this.http.get(this.baseURL)
  }

  getEmployeeById(_id:any){
    return this.http.get(this.baseURL+`/${_id}`)
  }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: any) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
