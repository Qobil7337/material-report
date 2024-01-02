import {Component,OnInit} from '@angular/core';
import {FormArray, FormBuilder,FormGroup, Validators} from "@angular/forms";
import {Nomenclature} from "../../nomenclature/nomenclature.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";



@Component({
  selector: 'app-goods-inward-create',
  templateUrl: './goods-inward-create.component.html',
  styleUrls: ['./goods-inward-create.component.css']
})
export class GoodsInwardCreateComponent implements OnInit{
  goodsInwardsForm: FormGroup
  nomenclatures: Nomenclature[]
  url = 'https://whale-app-cb8sf.ondigitalocean.app/nomenclature'
  urlCreate = 'https://whale-app-cb8sf.ondigitalocean.app/goods-inwards'
  showTable = false

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) { }


  ngOnInit() {
    this.goodsInwardsForm = this.fb.group({
      date: ['', Validators.required],
      supplier: ['', Validators.required],
      warehouse: ['', Validators.required],
      goodsInwardsItems: this.fb.array([
        this.createGoodsInwardsItemsFormGroup()
      ]),
      totalSum: ['', Validators.required]
    });
    this.loadNomenclatures();

    // Flag to prevent recursive calls
    let updatingSum = false;

    // Subscribe to changes in the form array to update sum
    this.goodsInwardsItems.valueChanges.subscribe(() => {
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
  }

  updateSum() {
    let totalSum = 0;

    this.goodsInwardsItems.controls.forEach((control) => {
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
      totalSum += sum;
    });

    // Set the total sum in the form
    // @ts-ignore
    this.goodsInwardsForm.get('totalSum').setValue(totalSum);
  }


  createGoodsInwardsItemsFormGroup(): FormGroup {
    return this.fb.group({
      nomenclatureID: [''],
      nomenclatureName: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      sum: ['', Validators.required],
    });
  }

  get goodsInwardsItems() {
    return this.goodsInwardsForm.get('goodsInwardsItems') as FormArray;
  }


  addGoodsInwardsItem() {
    this.goodsInwardsItems.push(this.createGoodsInwardsItemsFormGroup());
    this.showTable = true
  }

  onSubmit() {
    const formData = this.goodsInwardsForm.value
    console.log(formData)
    this.http.post(this.urlCreate, formData).subscribe(() => {
      this.router.navigate(['goods-inwards'])
    })

  }

    loadNomenclatures() {
    this.http.get<Nomenclature[]>(this.url).subscribe(data => {
      this.nomenclatures = data;
    });
  }

  updateNomenclatureId(index: number): void {
    // @ts-ignore
    const selectedNomenclatureName = this.goodsInwardsItems.at(index).get('nomenclatureName').value;
    const selectedNomenclature = this.nomenclatures.find(nomenclature => nomenclature.name === selectedNomenclatureName);

    if (selectedNomenclature) {
      // @ts-ignore
      this.goodsInwardsItems.at(index).get('nomenclatureID').setValue(selectedNomenclature.id);
    }
  }

  removeFormGroup(index: number) {
    this.goodsInwardsItems.removeAt(index)
  }



}



// WORKING CODE
// import {Component,OnInit} from '@angular/core';
// import {FormArray, FormBuilder,FormGroup, Validators} from "@angular/forms";
//
//
//
// @Component({
//   selector: 'app-goods-inward-create',
//   templateUrl: './goods-inward-create.component.html',
//   styleUrls: ['./goods-inward-create.component.css']
// })
// export class GoodsInwardCreateComponent implements OnInit{
//   profileForm: FormGroup
//
//   constructor(private fb: FormBuilder) { }
//   showTable = false
//   ngOnInit() {
//     this.profileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: [''],
//       address: this.fb.group({
//         street: [''],
//         city: [''],
//         state: [''],
//         zip: ['']
//       }),
//       aliases: this.fb.array([
//         this.createAliasFormGroup()
//       ])
//     });
//   }
//
//   createAliasFormGroup(): FormGroup {
//     return this.fb.group({
//       aliasName: [''],
//       aliasValue: ['']
//     });
//   }
//
//   get aliases() {
//     return this.profileForm.get('aliases') as FormArray;
//   }
//
//
//   addAlias() {
//     this.aliases.push(this.createAliasFormGroup());
//   }
//
//   onSubmit() {
//     console.log(this.profileForm.value);
//   }
//
// }





// this.goodsInwardsForm = new FormGroup({
//   'date': new FormControl(),
//   'supplier': new FormControl(),
//   'warehouse': new FormControl(),
//   'goodsInwardsItems': new FormArray([
//     new FormGroup({
//       'nomenclatureID': new FormControl(),
//       'nomenclatureName': new FormControl(),
//       'unit': new FormControl(),
//       'quantity': new FormControl(),
//       'price': new FormControl(),
//       'sum': new FormControl(),
//     })
//   ])
// })

// formGroup {
//   date: controller
//   supplier: controller
//   warehouse: controller
//   goodsInwardsItems: formArray[
//     formGroup: {
//     nomenclatureID: controller
//     nomenclatureName: controller
//     unit: controller
//     quantity: controller
//     price: controller
//     sum: controller
//   },
//   formGroup: {
//     nomenclatureID: controller
//     nomenclatureName: controller
//     unit: controller
//     quantity: controller
//     price: controller
//     ]
//   totalSum: controller
// }


//
// import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {Nomenclature} from "../../nomenclature/nomenclature.component";
// import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
//
//
//
// @Component({
//   selector: 'app-goods-inward-create',
//   templateUrl: './goods-inward-create.component.html',
//   styleUrls: ['./goods-inward-create.component.css']
// })
// export class GoodsInwardCreateComponent implements OnInit{
//
//
//   url = 'http://localhost:3000/nomenclature';
//   selectedNomenclature: Nomenclature
//   selectedNomenclatures: Nomenclature[] = [];
//   nomenclatureIsAddedToTable = false
//   nomenclatures: Nomenclature[];
//   quantity: number[] = [];
//   price: number[] = [];
//   total: number[] = [];
//   goodsInwardsForm: FormGroup
//   goodsInwardsItems: FormArray
//
//   constructor(private http: HttpClient) {}
//
//   ngOnInit() {
//     this.goodsInwardsForm = new FormGroup({
//       'date': new FormControl(null, [Validators.required]),
//       'supplier': new FormControl(null, [Validators.required]),
//       'warehouse': new FormControl(null, [Validators.required]),
//       'goodsInwardsItems': new FormArray([]),
//       "totalSum": new FormControl(),
//     })
//     this.loadNomenclatures();
//   }
//   //
//   loadNomenclatures() {
//     this.http.get<Nomenclature[]>(this.url).subscribe(data => {
//       this.nomenclatures = data;
//     });
//   }
//
//   onAddNomenclature() {
//     this.nomenclatureIsAddedToTable = true
//     this.selectedNomenclatures.push(this.selectedNomenclature);
//     const formGroup = new FormGroup({
//       "nomenclatureID": new FormControl(this.selectedNomenclature.id),
//       "nomenclatureName": new FormControl(this.selectedNomenclature.name),
//       "unit": new FormControl(),
//       "quantity": new FormControl(),
//       "price": new FormControl(),
//     });
//     (<FormArray>this.goodsInwardsForm.get('goodsInwardsItems')).push(formGroup)
//   }
//
//   updateTotal(rowIndex: number) {
//     this.total[rowIndex] = this.quantity[rowIndex] * this.price[rowIndex];
//     console.log(rowIndex)
//   }
//
//   onSubmit() {
//     console.log(this.goodsInwardsForm)
//   }
//
//
// }
