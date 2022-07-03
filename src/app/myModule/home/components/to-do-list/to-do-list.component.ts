import { Component, OnInit,DoCheck } from '@angular/core';
//interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
}) 
export class ToDoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');
  constructor() { }

 ngDoCheck(){
  this.setLocalStorate()
}

  public setEmitTaskList(event:string){
    this.taskList.push({task:event, checked:false})
  }

  public deleteItemTaskList(event:number){
    this.taskList.splice(event,1);
  }

  public deleteAllTaskList(){
    const confim = window.confirm("Você tem certeza !?")
    if(confim){
      this.taskList = [];
    }
  }

  public validationInput(event:string, index:number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja deletar?")
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }
  public setLocalStorate(){
    if(this.taskList){
      //organiza os itens. quando o item estiver marcado ele vai pro final
      this.taskList.sort((first,last) => Number(first.checked) - Number(last.checked));
      //local storage
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
