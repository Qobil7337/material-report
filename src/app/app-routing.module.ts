import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NomenclatureComponent} from "./nomenclature/nomenclature.component";
import {CalculationComponent} from "./calculation/calculation.component";
import {GoodsInwardComponent} from "./goods-inward/goods-inward.component";
import {SalesComponent} from "./sales/sales.component";
import {RemainingStocksComponent} from "./remaining-stocks/remaining-stocks.component";
import {MaterialReportComponent} from "./material-report/material-report.component";
import {GoodsInwardCreateComponent} from "./goods-inward/goods-inward-create/goods-inward-create.component";
import {ProductsComponent} from "./products/products.component";
import {ProductCreateComponent} from "./products/product-create/product-create.component";
import {WarehouseComponent} from "./warehouse/warehouse.component";

const routes: Routes = [
  {path: 'nomenclature', component: NomenclatureComponent},
  {path: 'calculation', component: CalculationComponent},
  {path: 'goods-inwards', component: GoodsInwardComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'remaining-stocks', component: RemainingStocksComponent},
  {path: 'material-report', component: MaterialReportComponent},
  {path: 'goods-inwards-create', component: GoodsInwardCreateComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product-create', component: ProductCreateComponent},
  {path: 'warehouse', component: WarehouseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
