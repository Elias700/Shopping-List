


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Tarefa {
  id: number;
  title: string;
  included: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/shopping-list';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Erro ao obter itens'))
    );
  }

  addItem(item: Omit<Tarefa, 'id'>): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, item).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Erro ao adicionar item'))
    );
  }

  toggleItemStatus(id: number, included: boolean): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiUrl}/${id}`, { included }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Erro ao atualizar status do item'))
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, 'Erro ao deletar item'))
    );
  }

  private handleError(error: HttpErrorResponse, customMessage: string) {
    console.error(error);
    let message = customMessage;

    if (error.status === 0) {
      message = 'Não foi possível se conectar ao servidor. Verifique sua conexão.';
    } else if (error.status === 500) {
      message = 'Ocorreu um erro no servidor. Tente novamente mais tarde.';
    }
    alert(message);
    return throwError(() => new Error(message));
  }
}



