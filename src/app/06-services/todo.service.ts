import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class TodoService {
  constructor(private http: HttpClient) {}

  add(todo: any) {
    return this.http.post('...', todo);
  }

  getTodos() {
    return this.http.get<any>('...');
  }

  delete(id: number) {
    return this.http.delete('...');
  }
}
