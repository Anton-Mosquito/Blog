import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ICountries } from '../model/countries.interface';

@Component({
  selector: 'app-country-block',
  templateUrl: './country-block.component.html',
  styleUrls: ['./country-block.component.scss']
})
export class CountryBlockComponent implements  OnInit,AfterViewInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  loaded = false;

  @Input('changing') changing!: Subject<Array<ICountries>>;
  @Input('data') data!: Array<ICountries>;
  @Input('searchItem') searchItem!: string;
  @ViewChildren('more') more!: QueryList<ElementRef>;
  @ViewChildren('goBack') goBack!:  QueryList<ElementRef>;

  private noteOfPage = 8;
  notes! : Array<ICountries>;
  private counter = 1;

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.subscription.add(this.more.forEach((element: ElementRef) => {
      fromEvent<Event>(element.nativeElement, "click").subscribe((event)=> {
        const element = event.target as HTMLButtonElement;
        this.showHideBlock(element,'.front','next')
      })
    }));

    this.subscription.add(this.more.changes.subscribe((element)=>{
      element.toArray().forEach((element: ElementRef) => {
        fromEvent<Event>(element.nativeElement, "click")
        .subscribe((event) => {
          const element = event.target as HTMLButtonElement;
          this.showHideBlock(element,'.front','next');
      })
    })
  }));

    this.subscription.add(this.goBack.forEach((element: ElementRef) => {
      fromEvent<Event>(element.nativeElement, "click").subscribe((event)=> {
        const element = event.target as HTMLButtonElement;
        this.showHideBlock(element,'.back','prev');
      })
    }));

    this.subscription.add(this.goBack.changes.subscribe((element)=>{
      element.toArray().forEach((element: ElementRef) => {
        fromEvent<Event>(element.nativeElement, "click")
        .subscribe((event) => {
          const element = event.target as HTMLButtonElement;
          this.showHideBlock(element,'.back','prev');
        });
      });
    }));

    this.subscription.add(fromEvent(window, 'scroll').subscribe((_)=> {
      if(this.data.length === this.notes?.length) {
        this.counter = 0;
        return
      }

      const clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
      const documentHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
      const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

      if((documentHeight - clientHeight) <= scrollTop + 100 ) {
        this.counter = this.counter + 1;
        this.loadData();
      }

    }));


    this.subscription.add(this.changing.subscribe((changingValue) => {
      this.data = changingValue;
      this.loadData();
    }));
  }

  private loadData(): void {
    const start = (this.counter - 1) * this.noteOfPage;
    const end = start + this.noteOfPage;
    this.notes = this.data.slice(0, end);
    this.loaded = true;
  }

  private showHideBlock(element: HTMLButtonElement, findClass: string, direction: string): void {
    const parent = element.closest(findClass);
    let neighbor;

    switch (direction) {
      case 'next':
        neighbor = parent?.nextElementSibling;
        break;
      case 'prev':
        neighbor = parent?.previousElementSibling;
        break;
      default:
        break;
    }

    if(!parent?.classList.contains('active')) return;
    parent?.classList.remove('active');
    neighbor?.classList.add('active');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
