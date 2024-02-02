import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Nomenclature} from "../../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UriService} from "../../uri.service";
import {LoadingSpinnerService} from "../../loading-spinner/loading-spinner.service";
import {SweetAlertService} from "../../sweet-alert.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{
  productForm: FormGroup
  nomenclatures: Nomenclature[]
  url = this.uriService.getFullUrl('nomenclature')
  urlCreate = this.uriService.getFullUrl('product')
  showTable = false

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private uriService: UriService,
              protected loadingSpinnerService: LoadingSpinnerService,
              private sweetAlertService: SweetAlertService) { }


  ngOnInit() {
    this.productForm = this.fb.group({
      date: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      productItem: this.fb.array([
        this.createProductItemsFormGroup()
      ]),
      totalCost: ['', Validators.required],
      salePrice: ['', Validators.required],
      grossProfit: ['', Validators.required],
      grossProfitMargin: ['', Validators.required]
    });
    this.loadNomenclatures();

    // Flag to prevent recursive calls
    let updatingSum = false;
    let updatingGrossProfit = false;

    // Subscribe to changes in the form array to update sum
    this.productItem.valueChanges.subscribe(() => {
      // Check if already updating, if so, return to avoid recursion
      if (updatingSum) {
        return;
      }

      // Set flag to indicate that sum is being updated
      updatingSum = true;

      // Update sum
      this.updateSum();

      // Reset flag after updating
      updatingSum = false;
    });

    ////

    this.salePrice.valueChanges.subscribe(() => {
      // Check if already updating, if so, return to avoid recursion
      if (updatingGrossProfit) {
        return;
      }

      // Set flag to indicate that sum is being updated
      updatingGrossProfit = true;

      // Update sum
      this.updateGrossProfit();

      // Reset flag after updating
      updatingGrossProfit = false;
    })

    this.imageUrl.valueChanges.subscribe(() => {
      console.log(this.imageUrl.value)
    })

  }

  updateGrossProfit() {
    const totalCost = this.productForm.get('totalCost')?.value
    // @ts-ignore
    const price = this.salePrice.value
    const grossProfit = (price - totalCost)
    const grossProfitMargin = (((price - totalCost) / price) * 100).toFixed(2)
    this.productForm.get('grossProfit')?.setValue(grossProfit)
    this.productForm.get('grossProfitMargin')?.setValue(grossProfitMargin)
  }
  updateSum() {
    let totalCost = 0;

    this.productItem.controls.forEach((control) => {
      // @ts-ignore
      const quantity = control.get('quantity').value;
      // @ts-ignore
      const price = control.get('price').value;

      // Multiply quantity and price and update the sum
      // @ts-ignore
      const sum = quantity * price;
      // @ts-ignore
      control.get('sum').setValue(sum);

      // Accumulate the total sum
      totalCost += sum;
    });

    // Set the total sum in the form
    // @ts-ignore
    this.productForm.get('totalCost').setValue(totalCost);
  }


  createProductItemsFormGroup(): FormGroup {
    return this.fb.group({
      nomenclatureID: [''],
      nomenclatureName: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      sum: ['', Validators.required],
    });
  }

  get productItem() {
    return this.productForm.get('productItem') as FormArray;
  }

  get salePrice() {
    return this.productForm.get('salePrice') as FormControl;
  }

  get imageUrl() {
    return this.productForm.get('imageUrl') as FormControl;
  }


  addProductItem() {
    this.productItem.push(this.createProductItemsFormGroup());
    this.showTable = true
  }

  onSubmit() {
    this.loadingSpinnerService.show('create')
    const formData = this.productForm.value
    this.http.post(this.urlCreate, formData).subscribe(() => {
      this.loadingSpinnerService.hide()
      this.router.navigate(['products'])
      this.sweetAlertService.productCreatedAlert()
    }, error => {
      this.loadingSpinnerService.hide()
      this.sweetAlertService.handelCommonError()
    })
  }

  loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  updateNomenclatureId(index: number): void {
    // @ts-ignore
    const selectedNomenclatureName = this.productItem.at(index).get('nomenclatureName').value;
    const selectedNomenclature = this.nomenclatures.find(nomenclature => nomenclature.name === selectedNomenclatureName);

    if (selectedNomenclature) {
      // @ts-ignore
      this.productItem.at(index).get('nomenclatureID').setValue(selectedNomenclature.id);
    }
  }

  removeFormGroup(index: number) {
    this.productItem.removeAt(index)
  }
}
