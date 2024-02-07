import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import axios from 'axios';
import myHost from '../../../../conf';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Input() setting:any;
  props:any = [];
  category: Boolean = false;
  indexOpt:number = 1;
  optActive:number = 1;
  optCount: [number] | any= [];
  

  addOtion(value:any){
    this.optCount = [];
    this.indexOpt = 1;
    for (let i = 0; i < Number(value.target.value); i++) {      
      this.optCount.push(this.indexOpt)
      this.indexOpt++
    }
  }
  activeOpt(indx:number){
    this.optActive = indx; 
  }

  filterProps(val:any){
    this.props = this.setting.props.filter((ele:any) =>{
      return ele.category == val.target.value
    })
    this.category = this.props.length > 0 ? true:false;
  }
  addProduct(){
    // full_name: string, email: string, phone: string, role: string
    let myData:any = {filter:[], options: []}
    for (let i = 0; i < this.optCount.length; i++) {
      myData.options.push({id: `opt-${i+1}`, colors: [], value: ''})      
    }
    let formData = new FormData(document.forms.namedItem('add_form') as HTMLFormElement)
    formData.forEach((val, key) => {
      if(key === 'props'){
        !myData.filter.includes(val) && myData.filter.push(val);
      }else if(key.split('-').length === 3){
        let arrKey = key.split('-');
        
        myData.options.map((ele:any) => {
          if(ele.id === `opt-${arrKey[2]}`){
            if(arrKey[0] === 'colors'){
              return {...ele, colors: ele.colors.push(val)}
            }else{
              ele[arrKey[0]] = arrKey[0] === 'value' ? val : Number(val);
              return ele
            }
          }
        })
      }else{
        myData[key] = ['colors'].includes(key) ? formData.getAll(key):val;
      }
    })
    console.log(myData);
    
    axios.post(`${myHost}/add-product`, myData)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
  }

}
