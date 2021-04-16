import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { IArticle } from 'src/app/components/articles/model/article.interface';
import { IArticles } from 'src/app/components/articles/model/articles.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  ROOT_URL = 'https://newsapi.org/v2/top-headlines?';

  options = {
    params: {
    country: 'ua',
    apiKey: '3f181c156e1f42c5a822f56494493750'
   },
  }

  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    return this.http.get<IArticles>(this.ROOT_URL, this.options).pipe(
      map(({articles}) => articles)
    );
  }
}
