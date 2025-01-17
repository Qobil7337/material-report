import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CalculationComponent } from './calculation/calculation.component';
import { GoodsInwardComponent } from './goods-inward/goods-inward.component';
import { SalesComponent } from './sales/sales.component';
import { RemainingStocksComponent } from './remaining-stocks/remaining-stocks.component';
import { MaterialReportComponent } from './material-report/material-report.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { GoodsInwardCreateComponent } from './goods-inward/goods-inward-create/goods-inward-create.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";
import { ProductsComponent } from './products/products.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductComponent } from './sales/product/product.component';
import { CartComponent } from './sales/product/cart/cart.component';
import { ProductInCartComponent } from './sales/product/cart/product-in-cart/product-in-cart.component';
import { ProductNavComponent } from './sales/product-nav/product-nav.component';
import { OrdersComponent } from './orders/orders.component';
import {MatDialogModule} from "@angular/material/dialog";
import { WarehouseItemsComponent } from './warehouse/warehouse-items/warehouse-items.component';
import { WarehouseItemsMovementComponent } from './warehouse/warehouse-items-movement/warehouse-items-movement.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    NomenclatureComponent,
    NavigationComponent,
    CalculationComponent,
    GoodsInwardComponent,
    SalesComponent,
    RemainingStocksComponent,
    MaterialReportComponent,
    HomeComponent,
    GoodsInwardCreateComponent,
    ProductsComponent,
    ProductCreateComponent,
    WarehouseComponent,
    ProductComponent,
    CartComponent,
    ProductInCartComponent,
    ProductNavComponent,
    OrdersComponent,
    WarehouseItemsComponent,
    WarehouseItemsMovementComponent,
    LoadingSpinnerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
        NzSelectModule,
        NzSpinModule,
        MatDialogModule,
        NgxSpinnerModule.forRoot(),
        SweetAlert2Module.forRoot(),
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
