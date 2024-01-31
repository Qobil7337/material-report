import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UriService} from "../../uri.service";

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
  urlWarehouse = this.uriService.getFullUrl('warehouse');
  warehouseItems: WarehouseItems[] = []
  constructor(private http: HttpClient, private uriService: UriService) {
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
