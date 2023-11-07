import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nomenclature} from "../../nomenclature/nomenclature.component";



@Component({
  selector: 'app-goods-inward-create',
  templateUrl: './goods-inward-create.component.html',
  styleUrls: ['./goods-inward-create.component.css']
})
export class GoodsInwardCreateComponent implements OnInit{

  selectedNomenclature: any
  selectedNomenclatures: any = [];
  nomenclatureIsAddedToTable = false
  url = 'http://localhost:3000/nomenclature';
  nomenclatures: Nomenclature[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNomenclatures();
  }
  //
  loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  onAddNomenclature() {
    console.log(this.selectedNomenclature)
    this.nomenclatureIsAddedToTable = true
    this.selectedNomenclatures.push(this.selectedNomenclature)
    console.log(this.selectedNomenclatures)
  }

}
