import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  standalone: true
})
export class RupiahPipe implements PipeTransform {

  transform(value: number, withCents: boolean = false): string {
    if (value == null) return '-';

    const formattedValue = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: withCents ? 2 : 0,
      maximumFractionDigits: withCents ? 2 : 0,
    }).format(value);

    return formattedValue.replace('IDR', 'Rp').trim();
  }

}
