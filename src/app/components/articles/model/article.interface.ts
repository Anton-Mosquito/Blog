export interface IArticle {
  author: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  source: Array<ISource>;
  url: string;
  urlToImage: string;
}

interface ISource {
  id: null | string;
  name: string;
}
