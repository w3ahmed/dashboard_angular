import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import axios from 'axios';
import myHost from '../../../../conf';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  @Input() editUser:any

  handleEdit(){
    let myData:any = {};
    let formData = new FormData(document.forms.namedItem('edit_form') as HTMLFormElement);
    formData.forEach((val, key)=>{ if(val) myData[key] = val; })
    console.log(myData);
    
    axios.put(`${myHost}/edit-user`, myData)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
  }
}
