import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> CheckboxComponent),
    multi : true
  }
  ]
})
export class CheckboxComponent implements ControlValueAccessor{
  private _value = '';

  actionChange = (value:string)=> {};
  actionTouch = (value:string)=> {};

  constructor() { }
  writeValue(str: string): void {
    this._value = str;
  }
  registerOnChange(fn: any): void {
    this.actionChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.actionTouch = fn;
  }

  get value() :string{
    return this._value
  }

  set value(value:string) {
    this._value = value;
    this.actionChange(value);
    this.actionTouch(value);
  }


  public handleChange (event:Event) : void{
    this.value = (event.target as HTMLFormElement).checked;
  }
}
