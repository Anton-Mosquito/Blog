import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor,FormControl,NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> TextComponent),
    multi : true
  }
  ]
})
export class TextComponent implements ControlValueAccessor {
  private _text = '';

  @Input() objectForControlsText! : FormControl;
  @Input() placeHolder! : string;

  actionChange = (value:string)=> {};
  actionTouch = (value:string)=> {};


  writeValue(str: string): void {
    this._text = str;
  }
  registerOnChange(fn: any): void {
    this.actionChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.actionTouch = fn;
  }

  get value() :string{
    return this._text
  }

  set value(value:string) {
    this._text = value;
    this.actionChange(value);
    this.actionTouch(value);
  }

  get _objectForControlsText() {
    return this.objectForControlsText
  }

  public eventStarted (event:Event) : void{
    this.value = (event.target as HTMLInputElement).value;
  }
}
