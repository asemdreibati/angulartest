import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appAppHighlight]',
  standalone: true,
})
export class AppHighlightDirective {
  private eleRef=inject(ElementRef);

  @HostListener('mouseover') mouseOver(){
    this.eleRef.nativeElement.style.border = '2px solid rgba(0, 0, 0, 0.2)';
    this.eleRef.nativeElement.style.backgroundColor = 'whitesmoke';
  }

  @HostListener('mouseleave') mouseLeave(){
    this.eleRef.nativeElement.style.border = '2px solid rgba(255, 2, 2, 0.2)';
    this.eleRef.nativeElement.style.backgroundColor = 'white';
  }
}
