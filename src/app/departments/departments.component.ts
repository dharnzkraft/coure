import { SafePropertyRead } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/core/api-service.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  loading: boolean = false;
  departmentList: any[];
  departmentId: any;
  departmentName: any;
  toast:boolean = false;
  selectedDeptName: any;
  selectedSchoolId: any;
  selectedId: any;
  sortId: any;
  errorMsg: any;
  sorted: any;

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments(){
    this.loading = true;
    this.apiService.getDepartments().subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.length){
        this.departmentList = res;
      }
    },
    (error)=>{
      this.loading = false;
      console.log(error)
    })
  }

  addDepartment(){
    this.loading = true;
    const body = {
      "id": 0,
      "name": this.departmentName,
      "schoolId": this.departmentId,
      "school": {
        "id": 0,
        "name": this.departmentName
      }
    }

    this.apiService.addDepartment(body).subscribe((res:any)=>{
      this.loading = false;
      console.log(res)
      this.getDepartments();
    },(error)=>{
      this.loading = false;
      console.log(error);
      this.toast = true;
    })
  }

  editDepartment(id){

    const selectedDepartmentId = this.departmentList.findIndex(item => item.id == id);

    this.selectedId = id ;
    this.selectedDeptName = this.departmentList[selectedDepartmentId].name;
    this.selectedSchoolId = this.departmentList[selectedDepartmentId].schoolId;

  }

  sort(id){
    this.loading = true;
    this.apiService.sortDepartment(id).subscribe((res: any)=>{
      this.loading = false;
      console.log(res);
      this.departmentList = [res];
    },(error)=>{
      this.loading = false;
      this.errorMsg = error.title;
      alert('Not Found')
    })
  }

  submitEdit(){
    const body = {
      "id": this.selectedId,
      "name": this.selectedDeptName,
      "schoolId": this.selectedSchoolId,
      "school": {
        "id": 0,
        "name": "string"
      }
    }
    console.log(body)

    this.apiService.editDepartment(this.selectedId, body).subscribe((res: any)=>{
      console.log(res);
      this.getDepartments();
    })
  }

  deleteDept(id: any){
    console.log(id)
    this.apiService.deleteDepartment(id).subscribe((res: any)=>{
      console.log(res)
      this.getDepartments();
    })
  }

}
