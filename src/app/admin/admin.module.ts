import { MaterialDesign } from './../material/material';

import { ModalProductComponent } from './../components/modal-product/modal-product.component';
import { NavbarDetailComponent } from './../components/navbar-detail/navbar-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './../components/sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { ModalUserComponent } from '../components/modal-user/modal-user.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'product-list',
        component: ProductsComponent
      },
      {
        path: 'list-user',
        component: ListUserComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    UserComponent,
    AdminComponent,
    SidebarComponent,
    ListUserComponent,
    NavbarDetailComponent,
    ModalProductComponent,
    ModalUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule, 
    MaterialDesign,
    NgbModule,
    FormsModule,
    AngularFireStorageModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    DatePipe
  ],
})
export class AdminModule { }
