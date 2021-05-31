import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { of, from, EMPTY, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    // service = new TodoService(null);
    const spy = jasmine.createSpyObj('HttpClient', {
      post: of({}),
      get: of({}),
    });
    service = new TodoService(spy);
    component = new TodosComponent(service);
  });

  it('should set todos property with items returned from the server', () => {
    let todos = [1, 2, 3];

    spyOn(service, 'getTodos').and.callFake(() => {
      return from([todos]);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos);
    expect(component.todos.length).toBe(3);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake((t) => {
      return EMPTY;
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned to the server', () => {
    let todo = { id: 1 };
    // like callfake but cleaner, no need to define arrow fn
    let spy = spyOn(service, 'add').and.returnValue(from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message propery if server returns an error when adding a new todo', () => {
    let error = 'error from the server';
    let spy = spyOn(service, 'add').and.returnValue(throwError(error));

    component.add();

    expect(component.message).toBe(error);
  });

  it('should call the server to delete the todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});
