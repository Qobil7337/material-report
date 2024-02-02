import {Component, OnInit} from '@angular/core';
import {Nomenclature} from "../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {UriService} from "../uri.service";
import {LoadingSpinnerService} from "../loading-spinner/loading-spinner.service";
import {SweetAlertService} from "../sweet-alert.service";

export interface GoodsInwards {
  id: number
  date: Date
  supplier: string
  warehouse: string
  goodsInwardsItems: [
    {
      nomenclatureID: number,
      nomenclatureName: string,
      unit: Unit,
      quantity: number,
      price: number,
      sum: number
    }
  ]
  totalSum: number
}
export enum Unit {
  kg = "kg",
  pc = "piece",
  litre = "litre"
}
@Component({
  selector: 'app-goods-inward',
  templateUrl: './goods-inward.component.html',
  styleUrls: ['./goods-inward.component.css']
})
export class GoodsInwardComponent  implements OnInit {

  selectedGoodsInwardsItem: any
  nomenclatures: Nomenclature[]
  goodsInwards: GoodsInwards[] = [];

  constructor(private http: HttpClient,
              private uriService: UriService,
              protected loadingSpinnerService: LoadingSpinnerService,
              private sweetAlertService: SweetAlertService) {
  }


  ngOnInit(): void {
      this.loadGoodsInwards()
  }

  loadGoodsInwards() {
    this.loadingSpinnerService.show('fetch')
    const url = this.uriService.getFullUrl('goods-inwards');
    this.http.get<GoodsInwards[]>(url).subscribe((data) => {
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.loadingSpinnerService.hide()
      this.goodsInwards = data
    })
  }

  openModal(item: any) {
    this.selectedGoodsInwardsItem = item
    }


  public loadNomenclatures() {
    const url = this.uriService.getFullUrl('nomenclature');
    this.http.get<Nomenclature[]>(url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  deleteGoodsInwards(item: any) {
    this.sweetAlertService.deleteConfirmAlert().then(isConfirmed => {
      if (isConfirmed) {
        this.loadingSpinnerService.show('delete')
        const id = item.id;
        const url = this.uriService.getFullUrl(`goods-inwards/${id}`);
        this.http.delete(url).subscribe(() => {
          this.loadingSpinnerService.hide()
          this.sweetAlertService.goodsInwardDeletedAlert()
          this.loadGoodsInwards()
        }, error => {
          this.loadingSpinnerService.hide()
          this.sweetAlertService.handelCommonError()
        })
      }
    })

  }

  formatNumberWithSpaceSeparator(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

}
