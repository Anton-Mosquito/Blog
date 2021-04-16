import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  subscription: Subscription = new Subscription();

  @ViewChildren('imgBx')  imageBox!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.subscription.add(this.imageBox.toArray().forEach((element: ElementRef) => {
        fromEvent<Event>(element.nativeElement, "click")
        .subscribe((event)=> {
          console.log(event.target)
          const element =( event.target as HTMLDivElement);
          element.classList.toggle('active');
        });
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
