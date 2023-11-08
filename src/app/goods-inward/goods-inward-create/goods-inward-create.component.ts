import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nomenclature} from "../../nomenclature/nomenclature.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-goods-inward-create',
  templateUrl: './goods-inward-create.component.html',
  styleUrls: ['./goods-inward-create.component.css']
})
export class GoodsInwardCreateComponent implements OnInit{


  url = 'http://localhost:3000/nomenclature';
  selectedNomenclature: Nomenclature
  selectedNomenclatures: Nomenclature[] = [];
  nomenclatureIsAddedToTable = false
  nomenclatures: Nomenclature[];
  quantity: number[] = [];
  price: number[] = [];
  total: number[] = [];
  goodsInwardsForm: FormGroup

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.goodsInwardsForm = new FormGroup({
      'date': new FormControl(null, [Validators.required]),
      'supplier': new FormControl(null, [Validators.required]),
      'warehouse': new FormControl(null, [Validators.required])
    })
    this.loadNomenclatures();
  }
  //
  loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  onAddNomenclature() {
    this.nomenclatureIsAddedToTable = true
    this.selectedNomenclatures.push(this.selectedNomenclature)
  }

  updateTotal(rowIndex: number) {
    this.total[rowIndex] = this.quantity[rowIndex] * this.price[rowIndex];
    console.log(rowIndex)
  }

  onSubmit() {
    console.log(this.goodsInwardsForm)
  }


}
