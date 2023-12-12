import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface WarehouseItems {
  id: number
  unitOfMeasure: string
  accountingBalance: number
  inventory: {id: number, name: string}
}
@Component({
  selector: 'app-warehouse-items',
  templateUrl: './warehouse-items.component.html',
  styleUrls: ['./warehouse-items.component.css']
})
export class WarehouseItemsComponent {
  urlWarehouse = 'http://localhost:3000/warehouse';
  warehouseItems: WarehouseItems[] = []
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadWarehouse()
  }

  loadWarehouse() {
    this.http.get<WarehouseItems[]>(this.urlWarehouse).subscribe((data) => {
      this.warehouseItems = data
    })
  }
  showMovement() {

  }
}
