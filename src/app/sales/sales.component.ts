import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Products} from "../products/products.component";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  urlProduct = 'http://localhost:3000/product';
  products: Products[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadProducts()
  }



  loadProducts() {
    this.http.get<Products[]>(this.urlProduct).subscribe((data) => {
      this.products = data
    })
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }


}
