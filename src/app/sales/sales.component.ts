import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Products} from "../products/products.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  showModal = false
  urlProduct = 'http://localhost:3000/product';
  products: Products[] = [];
  pizzaCategory: Products[] = []
  burgersCategory: Products[] = []
  sandwichCategory: Products[] = []
  breakfastCategory: Products[] = []
  saladsCategory: Products[] = []
  spinnerCategory: Products[] = []
  drinksCategory: Products[] = []
  hotDrinksCategory: Products[] = []
  dessertsCategory: Products[] = []
  soupsCategory: Products[] = []
  appetizersCategory: Products[] = []
  iceCreamCategory: Products[] = []
  sauceCategory: Products[] = []
  @Output() onClearCart: EventEmitter<any> = new EventEmitter<any>()

  constructor(private http: HttpClient,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadProducts()
  }



  loadProducts() {
    this.http.get<Products[]>(this.urlProduct).subscribe((data) => {
      this.products = data
      this.pizzaCategory =  this.products.filter(value => value.category === 'Pizza')
      this.burgersCategory =  this.products.filter(value => value.category === 'Burgers')
      this.sandwichCategory =  this.products.filter(value => value.category === 'Sandwich')
      this.breakfastCategory =  this.products.filter(value => value.category === 'Breakfast')
      this.saladsCategory =  this.products.filter(value => value.category === 'Salads')
      this.spinnerCategory =  this.products.filter(value => value.category === 'Spinner')
      this.drinksCategory =  this.products.filter(value => value.category === 'Drinks')
      this.hotDrinksCategory =  this.products.filter(value => value.category === 'Hot-Drinks')
      this.dessertsCategory =  this.products.filter(value => value.category === 'Desserts')
      this.soupsCategory =  this.products.filter(value => value.category === 'Soups')
      this.appetizersCategory =  this.products.filter(value => value.category === 'Appetizers')
      this.iceCreamCategory =  this.products.filter(value => value.category === 'Ice-Cream')
      this.sauceCategory =  this.products.filter(value => value.category === 'Sauce')
    })
  }

  scrollToCategory(category: string): void {
    const sectionId = category.toLowerCase();
    const element = document.getElementById(sectionId);

    if (element) {
      const rect = element.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollToPosition = offsetTop - (windowHeight / 2);

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  }


  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  onOrderSave() {
      this.showModal = true
  }

  navigateToOrders() {
    this.router.navigate(['orders'])
  }

  onOk() {
    window.location.reload()
  }
}
