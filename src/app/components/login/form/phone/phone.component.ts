import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> PhoneComponent),
    multi : true
  }
  ]
})
export class PhoneComponent implements OnInit, ControlValueAccessor {
  private _phone = '';

  @Input() objectForControlsPhone! : FormControl;

  ngOnInit(): void {}

  actionChange = (value:string)=> {};
  actionTouch = (value:string)=> {};


  writeValue(str: string): void {
    this._phone = str;
  }
  registerOnChange(fn: any): void {
    this.actionChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.actionTouch = fn;
  }

  get value() :string{
    return this._phone
  }

  set value(value:string) {
    this._phone = value;
    this.actionChange(value);
    this.actionTouch(value);
  }

  get _objectForControlsPhone() {
    return this.objectForControlsPhone;
  }

  public eventStarted (event:Event) : void{
    this.value = (event.target as HTMLInputElement).value;
  }
}
