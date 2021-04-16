import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent, range, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmsService } from 'src/app/services/films/films.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { IFilm, IFilms } from './model/films.interface';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy, AfterViewInit {

  isSubmitted = false;
  loadingPagination = false;

  page = 1;
  totalPages = 0;
  maxPages = 100;
  quantityButton : number[] = [];

  films!: Array<IFilm>;
  totalResults! : string;

  options: Array<{name: string, value: string}> = [
    {name: 'Movie', value: 'movie'},
    {name: 'Series', value: 'series'},
    {name: 'Episode', value: 'episode'},
  ];

  @ViewChild('form') form!: HTMLFormElement;
  @ViewChildren('buttons') buttons! : QueryList<ElementRef<HTMLLinkElement>>;

  public filmNameControl!: FormControl;
  public selectControl!: FormControl;

  public stateInput = '';
  public selectData = '';

  private subscription: Subscription = new Subscription();

  isLoading: Subject<boolean> = this.loadingService.isLoading;
  isLoadingContent: Subject<boolean> = this.loadingService.isLoadingContent;

  constructor(
    private filmsService: FilmsService,
    private loadingService:LoadingService,
    private changeDetector : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filmNameControl = new FormControl(this.stateInput, [Validators.required]);

    this.selectControl = new FormControl(this.selectData, [Validators.required]);

    this.subscription.add(this.filmNameControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.stateInput = this.filmNameControl.value;
      }
    }));

    this.subscription.add(this.selectControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.selectData = this.selectControl.value.value;
      }
    }));
  }

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent<Event>(this.form.nativeElement, 'submit').subscribe((_) => {
      this.isSubmitted = true;
      if (this.stateInput && this.selectData) {
        this.filmsService.getFilms(this.stateInput, this.selectData).subscribe((response: IFilms) => {
          this.films = response.Search;
          this.totalResults = response.totalResults;
          this.createPagination();
          this.changeDetector.detectChanges();
          this.addSubscriptionForButtons()
        });
      } else {
        console.log('Something went wrong!')
      }
    }));
  }

  private addSubscriptionForButtons(): void {
    this.subscription.add(this.buttons.forEach((element: ElementRef) => {
      fromEvent<Event>(element.nativeElement, "click").subscribe((event)=> {
        event.preventDefault();
        const attr = (event.target as HTMLElement).dataset.page;
        const innerData = (event.target as HTMLElement).innerText;

        switch (attr) {
          case 'prev':
            this.prevPage();
            this.updateNumberOfPage('prev');
            break;
          case 'next':
            this.nextPage();
            this.updateNumberOfPage('next');
            break;
          case 'current':
            this.page = Number(innerData);
            this.getFilmByPage(this.page);
            break;
          default:
            break;
          }
        })
    }));

    this.subscription.add(this.buttons.changes.subscribe((element)=>{
      element.filter((el: ElementRef)=> el.nativeElement.dataset.page === 'current').forEach((element: ElementRef) => {
        fromEvent<Event>(element.nativeElement, "click")
        .subscribe((event) => {
          event.preventDefault();
          const innerData = (event.target as HTMLElement).innerText;
          this.page = Number(innerData);
          this.getFilmByPage(this.page);
        });
      });
    }));

  }

  private getFilmByPage(page: number): void {
    this.filmsService.getPage(String(page), this.stateInput, this.selectData).subscribe((response) => {
      this.films = response.Search;
      this.totalResults = response.totalResults;
    });
  }

  private createPagination() :void{
    this.totalPages = Math.ceil(Number(this.totalResults) / 10);
    if(this.totalPages > 10) {
      this.subscription.add(range(1,10).pipe(map(i => this.quantityButton.push(i))).subscribe());
    }
    else {
      this.subscription.add(range(1,this.totalPages).pipe(map(i => this.quantityButton.push(i))).subscribe());
    }
    this.loadingPagination = true;
  }


  private prevPage() :void {
    this.page -= 1
    this.getFilmByPage(this.page);
  }

  private nextPage() :void {
    this.page += 1;
    this.getFilmByPage(this.page);
  }


  private updateNumberOfPage(flag: string): void {
    this.quantityButton.length = 0;
    const iterator = 10;

    switch (flag) {
      case 'prev':
        if(this.page <= 10) {
          this.subscription.add(range(0, iterator).pipe(map(i => {
            const number = iterator - i;
            return this.quantityButton.unshift(number);
          })).subscribe());
        } else {
          this.subscription.add(range(this.page, iterator).pipe(map(i => {
            const number =  (i - iterator) + 1;
            return this.quantityButton.push(number);
          })).subscribe());
        }
        break;
        case 'next':
          this.maxPages = this.totalPages - this.page;
          if(this.maxPages > 10) {
            this.subscription.add(range(this.page, 10).pipe(map(i => this.quantityButton.push(i))).subscribe());
          }
          else {
            this.subscription.add(range(this.page,this.maxPages).pipe(map(i => this.quantityButton.push(i))).subscribe());
          }
        break;
        default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
