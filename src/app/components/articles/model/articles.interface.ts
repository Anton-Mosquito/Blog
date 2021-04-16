import { IArticle } from "./article.interface";

export interface IArticles {
  totalResults: number;
  status: string;
  articles: Array<IArticle>
}
