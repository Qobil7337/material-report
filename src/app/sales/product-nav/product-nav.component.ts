import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-product-nav',
  templateUrl: './product-nav.component.html',
  styleUrls: ['./product-nav.component.css']
})
export class ProductNavComponent {
  @Output() categoryClick: EventEmitter<string> = new EventEmitter<string>();

  onCategoryClick(category: string): void {
    this.categoryClick.emit(category);
  }
}
