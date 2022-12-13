import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/core/api-service.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentList: any;
  loading: boolean;
  firstName: any;
  lastName: any;
  title: any;
  email: any;
  phoneNumber: any;
  address: any;
  dob: any;
  departmentId: any;
  departmentName: any;
  schoolId: any;
  schoolName: any;
  selectedId: any;
  selectedFirstname: any;
  selectedLastname: any;
  selectedEmail: any;
  selectedAddress: any;
  selectedDOB: any;
  selectedPhoneNumber: any;
  selectedTitle: any;
  selectedDeptId: any;
  p: number = 1;

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit() {
    this.getStudents()
  }

  getStudents(){
    this.apiService.getStudents().subscribe((res:any)=>{
      console.log(res)
      this.studentList = res;
    })
  }

  addStudent(){
    const body = {
      "id": 0,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "title": this.title,
      "phoneNumber": JSON.stringify(this.phoneNumber),
      "email": this.email,
      "address": this.address,
      "dateOfBirth": this.dob,
      "departmentId": this.departmentId,
      "department": {
        "id": 0,
        "name": this.departmentName,
        "schoolId": this.schoolId,
        "school": {
          "id": 0,
          "name": this.schoolName
        }
      }
    }

    console.log(body)

    this.apiService.addStudent(body).subscribe((res: any)=>{
      console.log(res)
      this.getStudents();
    },(error)=>{
      console.log(error)
    })


  }

  deleteStudent(){

    this.apiService.deleteStudent(this.selectedId).subscribe((res: any)=>{
      this.getStudents()
    },(error)=>{
      console.log(error)
    })
  }



  selectStudent(id){
    const selectedStudentId = this.studentList.findIndex(item => item.id == id);

    this.selectedId = id ;
    this.selectedFirstname = this.studentList[selectedStudentId].firstName;
    this.selectedLastname = this.studentList[selectedStudentId].lastName;
    this.selectedEmail = this.studentList[selectedStudentId].email;
    this.selectedAddress = this.studentList[selectedStudentId].address;
    this.selectedDOB = this.studentList[selectedStudentId].dateOfBirth;
    this.selectedPhoneNumber = this.studentList[selectedStudentId].phoneNumber;
    this.selectedTitle = this.studentList[selectedStudentId].title;
    this.selectedDeptId = this.studentList[selectedStudentId].departmentId;

  }

  submitEdit(){
    const body = {
      "id": this.selectedId,
      "firstName": this.selectedFirstname,
      "lastName":this.selectedLastname,
      "title": this.selectedTitle,
      "phoneNumber": this.selectedPhoneNumber,
      "email": this.selectedEmail,
      "address": this.selectedAddress,
      "dateOfBirth": this.selectedDOB,
      "departmentId": this.selectedDeptId,
      "department": {
        "id": 0,
        "name": "string",
        "schoolId": 0,
        "school": {
          "id": 0,
          "name": "string"
        }
      }
    }
    console.log(body)

    this.apiService.editStudent(this.selectedId, body).subscribe((res)=>{
      console.log(res)
      this.getStudents()
    },(error)=>{
      console.log(error)
    })
  }





}
