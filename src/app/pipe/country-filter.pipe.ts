import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(countryList: Array<any>, searchCountry: string, fieldName: string):  Array<any> {
    if(countryList.length === 0 || searchCountry === ' ') {
      return countryList;
    }

    return countryList.filter((country) => country[fieldName].toLowerCase().indexOf(searchCountry.toLocaleLowerCase()) !== -1)
  }

}
