import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService} from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employeeobj: any;

  constructor(public employeeService: EmployeeService,private router:Router,private routers: ActivatedRoute) { }

  ngOnInit(): void {
    const id=this.routers.snapshot.queryParamMap.get('id');
    this.employeeService.getEmployeeById(id).subscribe(data=>{
      this.employeeobj=data;
    })
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null!
    }
  }

  updateEmployee(){
  this.employeeService.putEmployee(this.employeeobj).subscribe((res) => {
    alert('Updated successfully');
    this.resetForm();
    this.router.navigateByUrl('list');
  });

}
}
