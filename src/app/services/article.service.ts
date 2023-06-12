import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8000/articles/';
  private createArticleUrl ='http://localhost:8000/create-article/';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.createArticleUrl, article);
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    const url = `${this.apiUrl}${id}/update/`;
    return this.http.put<Article>(url, article);
  }

  deleteArticle(id: number): Observable<{}> {
    const url = `${this.apiUrl}${id}/delete/`;
    return this.http.delete(url);
  }
}
