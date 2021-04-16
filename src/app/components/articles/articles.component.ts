import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ArticlesService } from 'src/app/services/news/articles.service';
import { IArticle } from './model/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  postData?: Array<IArticle>;

  constructor(private articleServices: ArticlesService) {}

  ngOnInit(): void {
    this.articleServices.getArticles().subscribe(( articles : Array<IArticle>)=>{
      this.postData = articles;
    });
  }
}
