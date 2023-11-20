import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Nomenclature} from "../../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  productForm: FormGroup
  nomenclatures: Nomenclature[]
  url = 'http://localhost:3000/nomenclature'
  urlCreate = 'http://localhost:3000/goods-inwards'
  showTable = false

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) { }


  ngOnInit() {
    this.productForm = this.fb.group({
      date: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      inventoryItems: this.fb.array([
        this.createInventoryItemsFormGroup()
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
    this.inventoryItems.valueChanges.subscribe(() => {
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

  }

  updateGrossProfit() {
    const totalCost = this.productForm.get('totalCost')?.value
    // @ts-ignore
    const price = this.salePrice.value
    const grossProfit = (price - totalCost)
    const grossProfitMargin = (((price - totalCost) / price) * 100).toFixed(2) + '%'
    this.productForm.get('grossProfit')?.setValue(grossProfit)
    this.productForm.get('grossProfitMargin')?.setValue(grossProfitMargin)
  }
  updateSum() {
    let totalCost = 0;

    this.inventoryItems.controls.forEach((control) => {
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


  createInventoryItemsFormGroup(): FormGroup {
    return this.fb.group({
      nomenclatureID: [''],
      nomenclatureName: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      sum: ['', Validators.required],
    });
  }

  get inventoryItems() {
    return this.productForm.get('inventoryItems') as FormArray;
  }

  get salePrice() {
    return this.productForm.get('salePrice') as FormControl;
  }


  addInventoryItem() {
    this.inventoryItems.push(this.createInventoryItemsFormGroup());
    this.showTable = true
  }

  onSubmit() {
    const formData = this.productForm.value
    console.log(formData)
    this.http.post(this.urlCreate, formData).subscribe(() => {
      this.router.navigate(['products'])
    })

  }

  loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  updateNomenclatureId(index: number): void {
    // @ts-ignore
    const selectedNomenclatureName = this.inventoryItems.at(index).get('nomenclatureName').value;
    const selectedNomenclature = this.nomenclatures.find(nomenclature => nomenclature.name === selectedNomenclatureName);

    if (selectedNomenclature) {
      // @ts-ignore
      this.inventoryItems.at(index).get('nomenclatureID').setValue(selectedNomenclature.id);
    }
  }

  removeFormGroup(index: number) {
    this.inventoryItems.removeAt(index)
  }
}
