import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';


  @Output()
  public searchByCapital = new EventEmitter<string>();

  emitValue( value: string ): void {
    this.searchByCapital.emit( value );
  }
}
