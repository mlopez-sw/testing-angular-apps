import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  private _url = 'http://jsonplaceholder.typicode.com/users';

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get<any[]>(this._url);
  }

  getUser(userId: number) {
    return this._http.get(this.getUserUrl(userId));
  }

  addUser(user: any) {
    return this._http.post(this._url, JSON.stringify(user));
  }

  updateUser(user: any) {
    return this._http.put(this.getUserUrl(user.id), JSON.stringify(user));
  }

  deleteUser(userId: number) {
    return this._http.delete(this.getUserUrl(userId));
  }

  private getUserUrl(userId: number) {
    return this._url + '/' + userId;
  }
}
