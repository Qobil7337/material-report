import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";


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
  urlOrders = 'https://whale-app-cb8sf.ondigitalocean.app/order';
  orders: Orders[] = []
  selectedOrder: Orders
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.http.get<Orders[]>(this.urlOrders).subscribe((data) => {
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
    const id = item.id
    const url = `https://whale-app-cb8sf.ondigitalocean.app/order/${id}`
    this.http.delete(url).subscribe(() => {
      this.loadOrders()
    })
  }
}
