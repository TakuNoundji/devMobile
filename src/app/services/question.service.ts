// question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'https://mboaculture.ossu-technology.com/api'

  constructor(private http: HttpClient) {}

  saveQuestion(question: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/questions`, question, {observe: 'response'});
  }
}
