import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import axios from 'axios';
import myHost from '../../../conf';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AddProductComponent, EditProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  httpClient = inject(HttpClient);
  setting:any = [];
  products:any = [];
  filterData:any = []; 
  
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){    
    this.httpClient.get(myHost+'/api-products')
    .subscribe((data:any) =>{
      this.products = data;
      this.filterData = data;
    })
    this.httpClient.get(myHost+'/api-setting')
    .subscribe((data:any)=>{
      this.setting = data;
      console.log(data);
      
    })
    
  }



  filterType:string = 'title';
  myVal:string = '';
  editProduct = {}
  filterUser(val:any){
    this.myVal = (val.target as HTMLInputElement).value;
    console.log(this.myVal);
    
    this.filterData = this.products.filter((ele:any) => ele[this.filterType].match(new RegExp(this.myVal, 'i')) )
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
      this.editProduct = data;
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
