import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/Model/register.model';
import { AppService } from 'src/app/Services/todo-app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  constructor(
    public service: AppService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    this.service.registerUser().subscribe(
      (res) => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'User Register');
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.registerData = new Register();
  }
}
