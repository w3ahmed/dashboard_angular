import { Component } from '@angular/core';
import axios from 'axios';
import myHost from '../../../../conf';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUser(){
    // full_name: string, email: string, phone: string, role: string
    let myData:any = {}
    let formData = new FormData(document.forms.namedItem('add_form') as HTMLFormElement)
    formData.forEach((val, key) => {
      myData[key] = val;
    })
    console.log(myData);
    
    axios.post(`${myHost}/add-user`, myData)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
  }
}
