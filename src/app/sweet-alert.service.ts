import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }
  public rawMaterialSavedAlert() {
    Swal.fire({
      title: 'Success',
      text: 'Your changes have been saved successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  public orderSavedAlert() {
    Swal.fire({
      title: 'Success',
      text: 'Your order has been saved successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  public goodsInwardSavedAlert() {
    Swal.fire({
      title: 'Success',
      text: 'Your order has been saved successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  public productSavedAlert() {
    Swal.fire({
      title: 'Success',
      text: 'Your order has been saved successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  public async deleteConfirmAlert(): Promise<boolean> {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    return result.isConfirmed;
  }
  public rawMaterialDeletedAlert() {
    Swal.fire({
      title: "Deleted!",
      text: "The raw material has been deleted.",
      icon: "success"
    });
  }
  public goodsInwardDeletedAlert() {
    Swal.fire({
      title: "Deleted!",
      text: "The receipt has been deleted.",
      icon: "success"
    });
  }

  public productDeletedAlert() {
    Swal.fire({
      title: "Deleted!",
      text: "The product has been deleted.",
      icon: "success"
    });
  }

  public orderDeletedAlert() {
    Swal.fire({
      title: "Deleted!",
      text: "The order has been deleted.",
      icon: "success"
    });
  }

  public updateAlert() {
    Swal.fire({
      title: 'Update Successful',
      text:'Your changes have been successfully updated.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }


  public rawMaterialCreatedAlert() {
    Swal.fire({
      title: 'Creation Successful',
      text: 'The new raw material has been created successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  public goodsInwardCreatedAlert() {
    Swal.fire({
      title: 'Creation Successful',
      text: 'The new receipt has been created successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  public productCreatedAlert() {
    Swal.fire({
      title: 'Creation Successful',
      text: 'The new product has been created successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  public orderCreatedAlert() {
    Swal.fire({
      title: 'Creation Successful',
      text: 'The new order has been created successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  public handleProductErrorAlert() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! \n" +
        "Unable to delete the product. It is currently associated with one or more orders. Please delete orders that have this product first before deleting the product.",
    });
  }
  public handleNomenclatureErrorAlert() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! \n" +
        "Unable to delete the nomenclature. It is currently associated with one or more receipts or products. Please delete receipt or product that have this nomenclature first before deleting the nomenclature.",
    });
  }

  public handelCommonError() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! \nPlease try again"
    });
  }
}
