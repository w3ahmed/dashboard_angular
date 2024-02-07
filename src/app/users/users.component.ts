import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import axios from 'axios';
import myHost from '../../../conf';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink , RouterLinkActive, RouterOutlet, AddUserComponent, EditUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  title = 'Users';
  httpClient = inject(HttpClient)
  users:[] = []; 
  filterData:any = []; 


  ngOnInit(): void {
    this.getusers()
  }
  
  getusers(){
    this.httpClient.get(`${myHost}/api-users`)
    .subscribe((data:any) => {
      this.users = data;
      this.filterData = data;
    })
  }

  filterType:string = 'name';
  myVal:string = '';
  editUser = {}
  filterUser(val:any){
    this.myVal = (val.target as HTMLInputElement).value;
    console.log(this.myVal);
    
    this.filterData = this.users.filter((ele:any) => ele[this.filterType].match(new RegExp(this.myVal, 'i')) )
  };
  changeFilterType(val:any){
    this.filterType = val.target.value;
  }
  open(val:any, data?:any){
    if(val === 'add'){
      this.openAdd = !this.openAdd;
      this.openEdit = false;

    }else if(val === 'edit'){
      this.openEdit = !this.openEdit
      this.openAdd = false;
      this.editUser = data;
    }
  }
  openAdd = false;
  openEdit = false;
  handleDelete(data:string){
    axios.delete(`${myHost}/delete-user`, {data: {id:data}})
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
  }
}
