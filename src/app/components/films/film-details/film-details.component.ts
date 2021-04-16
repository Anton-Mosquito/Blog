import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films/films.service';
import { IFilmDetail } from '../model/films.interface';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit{

  private id!: string;
  info!: IFilmDetail;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService
    ) {
    this.route.params.subscribe((params)=> {
      this.id = params.filmsId
    })
  }

  ngOnInit(): void {
    this.filmsService.getFilmDetails(this.id).subscribe((response)=>{
      this.info = response;
    })
  }
}
