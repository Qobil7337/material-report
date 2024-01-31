import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UriService} from "../uri.service";
import {Products} from "../products/products.component";
import {LoadingSpinnerService} from "../loading-spinner/loading-spinner.service";
import {SweetAlertService} from "../sweet-alert.service";


export interface Orders {
  date: Date
  id: number
  orderItems: [
    {
      date: Date
      id: number
      price: number
      product: {
        id: number,
        name: string,
        category: string,
        imageUrl: string,
        totalCost: number,
        salePrice: number,
        grossProfit: number,
        grossProfitMargin: number,
        date: Date}
      quantity: number
      sum: number
    }
  ]
  total: number
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  urlOrders = this.uriService.getFullUrl('order')
  orders: Orders[] = []
  selectedOrder: Orders
  constructor(private http: HttpClient,
              private uriService: UriService,
              protected loadingSpinnerService: LoadingSpinnerService,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.loadingSpinnerService.show('fetch')
    this.http.get<Orders[]>(this.urlOrders).subscribe((data) => {
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.loadingSpinnerService.hide()
      this.orders = data
    })
  }

  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  openModal(item: any) {
    this.selectedOrder = item
  }

  deleteOrder(item: any) {
    this.sweetAlertService.deleteConfirmAlert().then(isConfirmed => {
      if (isConfirmed) {
        this.loadingSpinnerService.show('delete')
        const id = item.id;
        const url = this.uriService.getFullUrl(`order/${id}`);
        this.http.delete(url).subscribe(() => {
          this.loadingSpinnerService.hide()
          this.sweetAlertService.orderDeletedAlert()
          this.loadOrders()
        })
      }
    })
  }


}
