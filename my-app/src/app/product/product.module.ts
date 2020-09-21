import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProdListComponent } from './prod-list/prod-list.component';
import { ProductHomeComponent } from './product-home/product-home.component';


@NgModule({
  declarations: [ProdListComponent, ProductHomeComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
