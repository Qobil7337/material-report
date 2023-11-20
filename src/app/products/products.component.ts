import { Component } from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {GoodsInwards} from "../goods-inward/goods-inward.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  selectedGoodsInwardsItem: any
  nomenclatures: Nomenclature[]
  private url = 'http://localhost:3000/nomenclature';
  private urlGoodsInwards = 'http://localhost:3000/goods-inwards';
  goodsInwards: GoodsInwards[] = [];

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.loadGoodsInwards()
  }

  loadGoodsInwards() {
    this.http.get<GoodsInwards[]>(this.urlGoodsInwards).subscribe((data) => {
      this.goodsInwards = data
    })
  }

  openModal(item: any) {
    this.selectedGoodsInwardsItem = item
  }


  public loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      console.log(data)
      this.nomenclatures = data;
      console.log(this.nomenclatures)
    });
  }

  deleteGoodsInwards(item: any) {
    const id = item.id
    const url = `http://localhost:3000/goods-inwards/${id}`
    this.http.delete(url).subscribe(() => {
      this.loadGoodsInwards()
    })
  }
}
