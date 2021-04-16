import {Component, Input} from '@angular/core';
import { IFilm } from '../model/films.interface';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent{

  @Input() items! : Array<IFilm>;
}
