import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @ViewChild('txtInput') txtInput!: ElementRef;

  @Output()
  public searchByCapital = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  emitValue( value: string ): void {

    if(value === '') return;

    this.searchByCapital.emit( value );

    this.txtInput.nativeElement.value = '';
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm );
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
        if(value === '') return;
        this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
}
