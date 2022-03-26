import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/Model/item.model';
import { AppService } from 'src/app/Services/todo-app.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styles: [],
})
export class ItemFormComponent implements OnInit {
  constructor(public service: AppService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (this.service.itemData.id == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postToDoItem().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Item Creation');
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putToDoItem().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Item Update');
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.itemData = new Item();
  }
}
