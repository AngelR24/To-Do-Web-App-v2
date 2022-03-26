import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/Model/item.model';
import { AppService } from 'src/app/Services/todo-app.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: [],
})
export class ItemsComponent implements OnInit {
  constructor(public service: AppService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedItem: Item) {
    this.service.itemData = Object.assign({}, selectedItem);
  }

  onDelete(id: number) {
    this.service.deleteToDoItem(id).subscribe(
      (res) => {
        this.service.refreshList();
        this.toastr.error('Deleted successfully', 'Item Delete');
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }
}
