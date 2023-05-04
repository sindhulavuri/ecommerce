import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  presentPage: number = 1
  category: CategoryModel[] = [];
  modalHeader: string = '';
  categorys = new CategoryModel();

  categorysForms = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  constructor(private cService: CategoryService, private toastr: ToastrService) {

  }
  addCategory() {
    this.modalHeader = 'ADD Category';
    this.categorys = new CategoryModel();
  }
  editCategory(value: CategoryModel) {
    this.modalHeader = 'EDIT Category';
    this.categorys = value;
  }
  delete(id: any) {
    this.cService.delete(id).then((response) => {
      this.toastr.success('category delete successfully');
    })
      .catch((error: Response) => {
        this.toastr.error('un-handled exception occcured')
      })
  }
  saveCategory() {
    if (this.categorys.id) {
      this.cService.update(this.categorys.id, this.categorys)
        .then((response) => {
          this.toastr.success('updated successfully')

        })
        .catch((error: any) => {
          this.toastr.error('un-handled exception occured');

        });
    }
    else {
      this.cService.create(this.categorys).then((response) => {
        this.toastr.success('created successfully');

      })
        .catch((error: any) => {
          this.toastr.error('un handled exception occured')
        });
    }
    this.categorys = new CategoryModel()
  }

  ngOnInit(): void {
    this.cService.read().subscribe(response => {
      this.category = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as CategoryModel
        }
      })

    })

  }

}
