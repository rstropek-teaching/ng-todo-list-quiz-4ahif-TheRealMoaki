import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface todoItem {
  name: string;
  description: string;
  finished: boolean;  
}

interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean
}

interface IPerson { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  public people: Observable<IPerson[]>;
  public toDoList: Observable<ITodoItem[]>;  
  host: String = "http://localhost:8080/api";
  todos: ITodoItem[];
  filterPerson = "Empty";
  filterDone = false;
  showTaskForm = false;

  constructor(private httpClient: HttpClient) { 
    this.people = httpClient.get<IPerson[]>('http://localhost:8080/api/people');
    this.toDoList = httpClient.get<ITodoItem[]>('http://localhost:8080/api/todos');   
    this.loadTodoList();
  }

  loadTodoList() {
    this.httpClient.get<ITodoItem[]>(this.host + '/todos').subscribe(next => {
      this.todos = next;
    });    
  }

  filterNames() {
    this.filterPerson = (document.getElementById('filter_names') as any).value;
  }

  filterByDone(done: Boolean) {
    if(!this.filterDone)
      return true;
    return done;
  }

  filterByPerson(name: String) {
    if(this.filterPerson === name || this.filterPerson === "Empty")
      return true;
    return false;
  }

  isDone(done: Boolean): Boolean {
    if(done === undefined)
      done = false;          
    return done;
  }
  
  setDone(item: ITodoItem) {    
    item.done = !item.done;

  }   
}
