import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NomenclatureComponent} from "./nomenclature/nomenclature.component";
import {CalculationComponent} from "./calculation/calculation.component";
import {GoodsInwardComponent} from "./goods-inward/goods-inward.component";
import {SalesComponent} from "./sales/sales.component";
import {RemainingStocksComponent} from "./remaining-stocks/remaining-stocks.component";
import {MaterialReportComponent} from "./material-report/material-report.component";

const routes: Routes = [
  {path: 'nomenclature', component: NomenclatureComponent},
  {path: 'calculation', component: CalculationComponent},
  {path: 'goods-inwards', component: GoodsInwardComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'remaining-stocks', component: RemainingStocksComponent},
  {path: 'material-report', component: MaterialReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
