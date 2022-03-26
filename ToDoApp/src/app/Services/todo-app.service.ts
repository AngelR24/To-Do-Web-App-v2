import { Injectable } from '@angular/core';
import { Item } from '../Model/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../Model/login.model';
import { Register } from '../Model/register.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly root = 'https://localhost:44379/';
  readonly baseURL = this.root + 'api/Item';
  readonly authenticationURL = this.root + 'api/Authentication';
  list: Item[] = [];

  constructor(private http: HttpClient) {}

  itemData: Item = new Item();
  loginData: Login = new Login();
  registerData: Register = new Register();

  postToDoItem() {
    return this.http.post(this.baseURL, this.itemData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  putToDoItem(item?: Item) {
    if (item != null && item != undefined) {
      return this.http.put(`${this.baseURL}/${item.id}`, item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this.http.put(`${this.baseURL}/${this.itemData.id}`, this.itemData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteToDoItem(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then((res) => {
        this.list = res as Item[];
      });
  }

  loginUser() {
    return this.http.post(`${this.authenticationURL}/login`, this.loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  registerUser() {
    return this.http.post(
      `${this.authenticationURL}/register`,
      this.registerData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
