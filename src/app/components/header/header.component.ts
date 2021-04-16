import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit,OnDestroy {

  subscription: Subscription = new Subscription();

  @ViewChild('toggle') toggle!: ElementRef;
  @ViewChild('navigation') navigation!: ElementRef;

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent<Event>(this.toggle.nativeElement, 'click').subscribe((event)=>{
      const element = (event.target as HTMLDivElement);
      element.classList.toggle('active');
      this.navigation.nativeElement.classList.toggle('active');
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
