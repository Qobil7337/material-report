import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";

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
  private url = 'https://whale-app-cb8sf.ondigitalocean.app/nomenclature';
  public nomenclature: Nomenclature[];
  public name = new FormControl(null);
  public updateName = new FormControl(null)
  private selectedItemId: number;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNomenclatures();
  }

  public loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclature = data;
    });
  }

  public saveNomenclature() {
    const nomenclature = { name: this.name.value };
    this.http.post(this.url, nomenclature).subscribe(() => {
      this.loadNomenclatures();
    });
  }

  public onUpdateNomenclature(id: number) {
    this.selectedItemId = id;
  }

  public updateNomenclature() {
    const updateNomenclature = {name: this.updateName.value}
    this.http.put(this.url + '/' + this.selectedItemId, updateNomenclature).subscribe(() => {
      this.loadNomenclatures();
    })
  }

  public deleteNomenclature(id: number) {
    this.http.delete(this.url + '/' + id).subscribe(() => {
      this.loadNomenclatures();
    });
  }
}
