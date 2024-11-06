import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appRupiahFormatter]',
  standalone: true
})
export class RupiahFormatterDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {

    const numericValue = value.replace(/[^,\d]/g, '');

    this.control.control?.setValue(numericValue, { emitEvent: false });

    this.renderer.setProperty(this.el.nativeElement, 'value', this.formatToRupiah(numericValue));
  }

  private formatToRupiah(value: string): string {
    if (!value) return '';

    const numberValue = parseFloat(value.replace(/,/g, ''));

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numberValue);
  }
}
