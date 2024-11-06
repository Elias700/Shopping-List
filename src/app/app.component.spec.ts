


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

interface Tarefa {
  id?: number;
  title: string;
  included: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: Tarefa[] = [
    { id: 1, title: 'Camisa', included: false },
    { id: 2, title: 'Calça', included: true },
  ];

  itemForm: FormGroup;
  editingItem: Tarefa | null = null;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  get itensComprados() {
    return this.items.filter((item) => item.included);
  }

  get itensNaoComprados() {
    return this.items.filter((item) => !item.included);
  }

  addItem() {
    if (this.itemForm.valid) {
      const title = this.itemForm.get('itemName')?.value;

      if (this.editingItem) {
        this.editingItem.title = title;
        this.editingItem = null;
      } else {
        this.items.push({ id: Date.now(), title, included: false });
      }

      this.itemForm.reset();
    }
  }

  startEditing(item: Tarefa) {
    this.editingItem = item;
    this.itemForm.setValue({ itemName: item.title });
  }

  removeItem(item: Tarefa) {
    this.items = this.items.filter((i) => i !== item);
  }

  toggleItem(item: Tarefa) {
    item.included = !item.included;
  }
}


