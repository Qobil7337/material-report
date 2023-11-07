import {Component, OnInit} from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-goods-inward',
  templateUrl: './goods-inward.component.html',
  styleUrls: ['./goods-inward.component.css']
})
export class GoodsInwardComponent  implements OnInit {

  selectedGoodsInwardsItem: any
  nomenclatures: Nomenclature[]
  private url = 'http://localhost:3000/nomenclature';



  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {

  }



  goodsInwards = [
    {
      goodsInwardsID: 1,
      supplier: "Mall",
      warehouse: "Central",
      totalSum: "60 000",
      dateOfDelivery: "2023-10-01",
      goodsInwardsItem: [
        {
          goodsInwardsID: 1,
          nomenclatureID: "2",
          nomenclatureName: "Tomato",
          unitOfMeasure: "kg",
          quantity: 1.5,
          price: "10 000",
          totalSum: "15 000",
          dateOfDelivery: "2023-10-01"
        },
        {
          goodsInwardsID: 1,
          nomenclatureID: "3",
          nomenclatureName: "Cheese",
          unitOfMeasure: "kg",
          quantity: 1,
          price: "15 000",
          totalSum: "15 000",
          dateOfDelivery: "2023-10-01"
        },
        {
          goodsInwardsID: 1,
          nomenclatureID: "4",
          nomenclatureName: "Sandwich bread",
          unitOfMeasure: "pc",
          quantity: 15,
          price: "20 00",
          totalSum: "30 000",
          dateOfDelivery: "2023-10-01"
        }
      ]
    },
    {
      goodsInwardsID: 2,
      supplier: "Mall",
      warehouse: "Central",
      totalSum: "90 000",
      dateOfDelivery: "2023-10-02",
      goodsInwardsItem: [
        {
          goodsInwardsID: 2,
          nomenclatureID: "6",
          nomenclatureName: "Potato",
          unitOfMeasure: "kg",
          quantity: 3,
          price: "10 000",
          totalSum: "30 000",
          dateOfDelivery: "2023-10-02"
        },
        {
          goodsInwardsID: 2,
          nomenclatureID: "4",
          nomenclatureName: "Cheese",
          unitOfMeasure: "kg",
          quantity: 2,
          price: "20 000",
          totalSum: "40 000",
          dateOfDelivery: "2023-10-02"
        },
        {
          goodsInwardsID: 2,
          nomenclatureID: "6",
          nomenclatureName: "Sandwich bread",
          unitOfMeasure: "pc",
          quantity: 10,
          price: "2 000",
          totalSum: "20 000",
          dateOfDelivery: "2023-10-02"
        }
      ]
    }
  ]

  openModal(item: any) {
    this.selectedGoodsInwardsItem = item
    }


  public loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
      console.log(this.nomenclatures)
    });
  }

}
