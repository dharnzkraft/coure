import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ApiServiceService {

  baseUrl = environment.baseApi;

  constructor(
    private http: HttpClient
  ) { }

  // Department calls
  getDepartments(){
    return this.http.get(this.baseUrl+'api/Departments')
  }

  addDepartment(data:any){
    return this.http.post(this.baseUrl+'api/Departments', data)
  }

  editDepartment(id: any, data: any){
    return this.http.put(this.baseUrl+`api/Departments/${id}`, data)
  }


  deleteDepartment(id: any){
    return this.http.delete(this.baseUrl+`api/Departments/${id}`)
  }

  sortDepartment(id: any){
    return this.http.get(this.baseUrl+`api/Departments/${id}`)
  }

  // School calls

  getSchools(){
    return this.http.get(this.baseUrl+'api/Schools')
  }

  addSchool(data:any){
    return this.http.post(this.baseUrl+'api/Schools', data)
  }

  editSchool(id: any, data: any){
    return this.http.put(this.baseUrl+`api/Schools/${id}`, data)
  }


  deleteSchool(id: any){
    return this.http.delete(this.baseUrl+`api/Schools/${id}`)
  }

  sortSchool(id: any){
    return this.http.get(this.baseUrl+`api/Schools/${id}`)
  }

  // Student calls
  getStudents(){
    return this.http.get(this.baseUrl+'api/Students')
  }

  addStudent(data:any){
    return this.http.post(this.baseUrl+'api/Students', data)
  }

  editStudent(id: any, data: any){
    return this.http.put(this.baseUrl+`api/Students/${id}`, data)
  }


  deleteStudent(id: any){
    return this.http.delete(this.baseUrl+`api/Students/${id}`)
  }

  sortStudent(id: any){
    return this.http.get(this.baseUrl+`api/Students/${id}`)
  }

}
