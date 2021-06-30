import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService} from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  dataSource:any;

  constructor(public employeeService : EmployeeService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.employeeService.getEmployee().subscribe((data)=>{
      this.dataSource=data;
    })

  }

  displayedColumns: string[] = ['name', 'position', 'office','Salary','Action'];

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?')) {
      window.location.reload();
      this.employeeService.deleteEmployee(id).subscribe(() => {
        alert("Record Deleted.");
    });
    }
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee=emp;
    this.router.navigateByUrl('/edit?id='+emp._id).then(() => {
    });
  }
  
}
