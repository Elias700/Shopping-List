


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService } from './services/shopping-list-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

interface Tarefa {
  id: number;
  title: string;
  included: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  itemForm: FormGroup;
  items: Tarefa[] = [];
  editingItem: Tarefa | null = null;

  constructor(
    private fb: FormBuilder,
    private shoppingListService: ShoppingListService
  ) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.shoppingListService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  addItem() {
    if (this.itemForm.valid) {
      const title = this.itemForm.get('itemName')?.value;
      const newItem: Tarefa = { id: Date.now(), title, included: false };

      this.items.push(newItem);
      this.itemForm.reset();
    }
  }

  startEditing(item: Tarefa) {
    this.editingItem = item;
    this.itemForm.setValue({ itemName: item.title });
  }

  toggleItem(item: Tarefa) {
    item.included = !item.included;
  }

  removeItem(item: Tarefa) {
    this.items = this.items.filter((i) => i.id !== item.id);
  }


  get itensComprados() {
    return this.items.filter((item) => item.included);
  }

  get itensNaoComprados() {
    return this.items.filter((item) => !item.included);
  }
}




