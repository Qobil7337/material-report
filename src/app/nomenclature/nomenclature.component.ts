import { Component } from '@angular/core';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.css']
})
export class NomenclatureComponent {
    nomenclature = [
      {
        id: 12345,
        name: "Tomato"
      },
      {
        id: 54321,
        name: "Cucumber"
      },
      {
        id: 34523,
        name: "Onion"
      },
      {
        id: 59094,
        name: "Ketchup"
      },
      {
        id: 44356,
        name: "Mayonnaise"
      }
    ]
}
