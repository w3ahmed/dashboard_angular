import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path: 'users', component: UsersComponent, title: 'Users'},
    {path: 'products', component: ProductsComponent, title: 'Products'}
];
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };
  