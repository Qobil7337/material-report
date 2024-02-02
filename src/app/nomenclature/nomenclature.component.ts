import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UriService} from "../uri.service";
import {SweetAlertService} from "../sweet-alert.service";
import {NgxSpinnerService} from "ngx-spinner";
import {LoadingSpinnerService} from "../loading-spinner/loading-spinner.service";

export interface Nomenclature {
  id: number;
  name: string;
}

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.css']
})
export class NomenclatureComponent implements OnInit {
  private url = this.uriService.getFullUrl('nomenclature')
  public nomenclature: Nomenclature[];
  public name = new FormControl(null);
  public updateName = new FormControl(null)
  private selectedItemId: number;


  constructor(private http: HttpClient, private uriService: UriService,
              private sweetAlertService: SweetAlertService,
              private spinnerService: NgxSpinnerService,
              protected loadingSpinnerService: LoadingSpinnerService) {}

  ngOnInit() {
    this.loadNomenclatures();
  }

  public loadNomenclatures() {
    this.loadingSpinnerService.show('fetch')
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.loadingSpinnerService.hide()
      this.nomenclature = data;
    });
  }

  public saveNomenclature() {
    this.loadingSpinnerService.show('save')
    const nomenclature = { name: this.name.value };
    this.http.post(this.url, nomenclature).subscribe(() => {
      this.loadingSpinnerService.hide()
      this.sweetAlertService.rawMaterialCreatedAlert()
      this.loadNomenclatures();
    }, error => {
      this.loadingSpinnerService.hide()
      this.sweetAlertService.handelCommonError()
    });
  }

  public onUpdateNomenclature(id: number) {
    this.selectedItemId = id;
  }

  public updateNomenclature() {
    const updateNomenclature = {name: this.updateName.value}
    this.loadingSpinnerService.show('update')
    this.http.put(this.url + '/' + this.selectedItemId, updateNomenclature).subscribe(() => {
      this.loadingSpinnerService.hide()
      this.sweetAlertService.updateAlert()
      this.loadNomenclatures();
    }, error => {
      this.loadingSpinnerService.hide()
      this.sweetAlertService.handelCommonError()
    })
  }

  public deleteNomenclature(id: number) {
    this.sweetAlertService.deleteConfirmAlert().then(isConfirmed => {
      if (isConfirmed) {
        this.loadingSpinnerService.show('delete')
        this.http.delete(this.url + '/' + id).subscribe(() => {
            this.loadingSpinnerService.hide()
            this.sweetAlertService.rawMaterialDeletedAlert()
            this.loadNomenclatures();
        }, error => {
          this.loadingSpinnerService.hide()
          this.sweetAlertService.handleNomenclatureErrorAlert()
          console.log(error)
        });
      }
    })
  }

}
