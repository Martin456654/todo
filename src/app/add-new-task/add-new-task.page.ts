import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

import { IonDatetime } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories = [];
  taskObject = {};
  taskName;
  taskDate;
  taskPriority;
  taskCategory;


  constructor(public modalCtrl:ModalController, public todoService:TodoService) { }

  ngOnInit() {
    this.categories.push("work");
    this.categories.push("personal");
    this.categories.push("home");
  }
  
  async AddTask(){
    this.taskObject = (
      {
        itemName: this.taskName,
        itemDueDate: this.taskDate,
        itemPriority: this.taskPriority,
        itemCategory: this.taskCategory
      }
    );

    let uid = this.taskName + this.taskDate
    if(uid){
      await this.todoService.addTask(uid, this.taskObject);
    }else{
      console.log("can't save empty task!");
    }

    this.dismis()
  }

  selectedCategory(index){
    this.taskCategory = this.categories[index];
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.taskObject);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
}
