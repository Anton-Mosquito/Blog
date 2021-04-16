import { AfterViewInit, Component, ContentChild, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { CountryBlockComponent } from './country-block/country-block.component';
import { ICountries } from './model/countries.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit, OnDestroy {

  countries! : Array<ICountries>;

  @ViewChild(CountryBlockComponent) child!: CountryBlockComponent;
  @ViewChild('select') select!: ElementRef<HTMLSelectElement>;

  options: Array<{value: string, name: string}> = [
    {value: 'all', name: 'All countries'},
    {value: 'EU', name: 'European Union'},
    {value: 'EFTA', name: 'European Free Trade Association'},
    {value: 'PA', name: 'Pacific Alliance'},
    {value: 'AU', name: 'African Union'},
    {value: 'USAN', name: 'Union of South American Nations'},
    {value: 'EEU', name: 'Eurasian Economic Union'},
    {value: 'AL', name: 'Arab League'},
    {value: 'ASEAN', name: 'Association of Southeast Asian Nations'},
    {value: 'CAIS', name: 'Central American Integration System'},
    {value: 'CEFTA', name: 'Central European Free Trade Agreement'},
    {value: 'NAFTA', name: 'North American Free Trade Agreement'},
    {value: 'SAARC', name: 'South Asian Association for Regional Cooperation'},
  ];

  searchCountry = '';
  subscription: Subscription = new Subscription();
  userUpdatedEvent: Subject<Array<ICountries>> = new Subject();

  constructor(
    private countriesService: CountriesService,
    ) {
    this.userUpdatedEvent.next(this.countries);
  }

  ngOnInit(): void {
    this.subscription.add(this.countriesService.getAllCountries().subscribe((response) => {
      this.countries = response;
    }))
  }

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent(this.select.nativeElement,'change').subscribe((event)=>{
      const option = (event.target as HTMLSelectElement).value;
      this.child.loaded = false;

      if(option === 'all'){
       this.countriesService.getAllCountries().subscribe((response) => {
          this.countries = response;
          this.userUpdatedEvent.next(this.countries);
        });
      } else {
        this.countriesService.getFilteredCountries(option).subscribe((response) => {
          this.countries = response;
          this.userUpdatedEvent.next(this.countries);
        });
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
