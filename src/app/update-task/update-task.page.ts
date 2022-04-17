import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;

  categories = [];
  categorySelectedCategory;

  newTaskObj= {};
  taskName;
  taskDueDate;
  taskPriority;
  taskCategory;

  constructor(public modalCtrl:ModalController, public todoService:TodoService) { }

  ngOnInit() {
    this.categories.push("work");
    this.categories.push("personal");
    this.categories.push("home");

    this.taskName = this.task.value.itemName;
    this.taskDueDate = this.task.value.itemDueDate;
    this.taskPriority = this.task.value.itemPriority;
    this.taskCategory = this.task.value.itemCategory;
  }

  selectedCategory(index){
    this.taskCategory = this.categories[index];
  }

  async dismis(){
    await this.modalCtrl.dismiss();
  }

  async update(){
    this.newTaskObj = (
      {
        itemName: this.taskName,
        itemDueDate: this.taskDueDate,
        itemPriority: this.taskPriority,
        itemCategory: this.taskCategory
      }
    );

    let uid = this.task.key;

    await this.todoService.updateTask(uid, this.newTaskObj);
    this.dismis();
  }
}
