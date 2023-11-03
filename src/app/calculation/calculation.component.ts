import { Component } from '@angular/core';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent {
    selectedCalculation: any
    calculation= [
      {
        calculationID: 1,
        productID: 1,
        productName: "Chicken sandwich",
        dataCreated: "2023-10-01",
        nomenclatures: [
          {
            nomenclatureID: "6",
            nomenclatureName: "Sandwich bread",
            unitOfMeasure: "pc",
            quantity: "1",
            price: "3 000",
            totalSum: "3 000"
          },
          {
            nomenclatureID: "7",
            nomenclatureName: "Chicken",
            unitOfMeasure: "kg",
            quantity: "0.2",
            price: "30 000",
            totalSum: "6 000"
          },
          {
            nomenclatureID: "8",
            nomenclatureName: "Tomato",
            unitOfMeasure: "kg",
            quantity: "0.05",
            price: "15 000",
            totalSum: "750"
          },
          {
            nomenclatureID: "9",
            nomenclatureName: "Salad",
            unitOfMeasure: "kg",
            quantity: "0.02",
            price: "35 000",
            totalSum: "700"
          },
          {
            nomenclatureID: "10",
            nomenclatureName: "Tomato Sauce",
            unitOfMeasure: "litre",
            quantity: "0.02",
            price: "50 000",
            totalSum: "1000"
          }
        ],
        totalCost: "11 450",
        grossProfit: "23 550",
        salePrice: "35 000",
        grossProfitMargin: "67%"
      },
      {
        calculationID: 1,
        productID: 1,
        productName: "Beef sandwich",
        dataCreated: "2023-10-02",
        nomenclatures: [
          {
            nomenclatureID: "6",
            nomenclatureName: "Sandwich bread",
            unitOfMeasure: "pc",
            quantity: "1",
            price: "3 000",
            totalSum: "3 000"
          },
          {
            nomenclatureID: "7",
            nomenclatureName: "Beef",
            unitOfMeasure: "kg",
            quantity: "0.2",
            price: "60 000",
            totalSum: "12 000"
          },
          {
            nomenclatureID: "8",
            nomenclatureName: "Tomato",
            unitOfMeasure: "kg",
            quantity: "0.05",
            price: "15 000",
            totalSum: "750"
          },
          {
            nomenclatureID: "9",
            nomenclatureName: "Salad",
            unitOfMeasure: "kg",
            quantity: "0.02",
            price: "35 000",
            totalSum: "700"
          },
          {
            nomenclatureID: "10",
            nomenclatureName: "Tomato Sauce",
            unitOfMeasure: "litre",
            quantity: "0.02",
            price: "50 000",
            totalSum: "1000"
          }
        ],
        totalCost: "17 450",
        grossProfit: "27 550",
        salePrice: "45 000",
        grossProfitMargin: "61%"
      }
    ]

  openModal(item: any) {
      this.selectedCalculation = item
  }
}
