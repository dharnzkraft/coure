import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/core/api-service.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  loading: boolean = false;
  schoolList: any[];
  schoolId: any;
  schoolName: any;
  toast:boolean = false;
  selectedDeptName: any;
  selectedSchoolId: any;
  selectedId: any;
  sortId: any;
  errorMsg: any;

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.getSchools()
  }

  getSchools(){
    this.loading = true;
    this.apiService.getSchools().subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.length){
        this.schoolList = res;
      }
    },
    (error)=>{
      this.loading = false;
      console.log(error)
    })
  }

  addSchool(){
    this.loading = true;
    const body = {
      "id": this.schoolId,
      "name": this.schoolName
    }

    this.apiService.addSchool(body).subscribe((res:any)=>{
      this.loading = false;
      console.log(res)
      this.getSchools()
    },(error)=>{
      this.loading = false;
      console.log(error);
      this.toast = true;
    })
  }

  editSchool(id){

    const selectedSchId = this.schoolList.findIndex(item => item.id == id);

    this.selectedId = id ;
    this.selectedDeptName = this.schoolList[selectedSchId].name;
    this.selectedSchoolId = this.schoolList[selectedSchId].id;

  }

  submitEdit(){
    const body = {
      "id": this.selectedId,
      "name": this.selectedDeptName
    }


    console.log(body)

    this.apiService.editSchool(this.selectedId, body).subscribe((res: any)=>{
      console.log(res);
      this.getSchools();
    }, (error)=>{
      console.log(error)
    })
  }

  deleteSchool(id: any){
    console.log(id)
    this.apiService.deleteSchool(id).subscribe((res: any)=>{
      console.log(res);
      this.getSchools();
    }, (error)=>{
      console.log(error)
    })
  }

  sort(id){
    this.loading = true;
    this.apiService.sortSchool(id).subscribe((res: any)=>{
      this.loading = false;
      console.log(res);
      this.schoolList = [res];
    },(error)=>{
      this.loading = false;
      this.errorMsg = error.title;
      alert('Not Found')
    })
  }

}
