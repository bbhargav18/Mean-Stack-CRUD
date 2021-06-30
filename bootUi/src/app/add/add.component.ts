import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [EmployeeService]
})
export class AddComponent implements OnInit {

  constructor(public employeeService: EmployeeService,private router:Router) { }

  ngOnInit(): void {
    this.resetForm();
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

  onSubmit(form: NgForm) {
   
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        
        alert('Saved successfully');
        this.resetForm(form);
        this.router.navigateByUrl('list');
       
      });
    }
   
  }




