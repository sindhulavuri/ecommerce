import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/model/category.model';
import { productModel } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { productService } from 'src/app/services/product.service';

@Component({
  selector: 'admin-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  presentPage: number = 1;
  modalHeader: string = '';
  product: productModel[] = [];
  category: CategoryModel[] = [];
  value = new productModel();
  selectedCategory: string = '';
  searchTerm: string;

  valueForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    imgUrl: new FormControl(null, Validators.required),

  })




  constructor(private pService: productService, private cService: CategoryService, private toast: ToastrService) {

  }
  addProduct() {
    this.modalHeader = 'ADD product'
    this.value = new productModel();
  }
  editproduct(item: productModel) {
    this.modalHeader = 'EDIT Product';
    this.value = item;
  }
  delete(id: any) {
    this.pService.delete(id)
      .then((response) => {
        this.toast.success('deleted successfully');
      })
      .catch((error: Response) => {
        this.toast.error('un-handled expection occured')
      })
  }
  saveProduct() {
    if (this.value.id) {
      this.pService.update(this.value.id, this.value)
        .then((response) => {
          this.toast.success('updated successfully')
        })
        .catch((error: any) => {
          this.toast.error('unhandeld expection occured')
        })
    }
    else {
      this.pService.create(this.value)
        .then((response) => {
          this.toast.success('added successfully');
        })
        .catch((error: any) => {
          this.toast.error('un-handled expection occured')
        })
    }
    this.value = new productModel();
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.pService.read(this.selectedCategory, this.searchTerm)
      .subscribe(response => {
        this.product = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as productModel
          }
        })
      })
    this.cService.read()
      .subscribe(response => {
        this.category = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as CategoryModel
          }
        })
      })
  }
}
