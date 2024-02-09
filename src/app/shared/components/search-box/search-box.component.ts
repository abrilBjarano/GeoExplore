import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';


  @ViewChild('txtInput') txtInput!: ElementRef;

  @Output()
  public searchByCapital = new EventEmitter<string>();

  emitValue( value: string ): void {

    // value.toLowerCase

    if(value === '') return;

    this.searchByCapital.emit( value );

    this.txtInput.nativeElement.value = '';
  }
}
