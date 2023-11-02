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
import {ReactiveFormsModule} from "@angular/forms";

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
