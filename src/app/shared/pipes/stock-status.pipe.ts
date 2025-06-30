import { Pipe, PipeTransform } from '@angular/core';

interface StockStatus {
  message: string;
  class: string;
  icon: string;
}

@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  transform(qtynk: number): StockStatus {
    if (qtynk > 60) {
      return {
        message: 'In Stock',
        class: 'text-green-600 font-semibold', 
        icon: '✔️',
      };
    } else if (qtynk > 10) {
      return {
        message: 'Limited Stock',
        class: 'text-yellow-500 font-semibold',
        icon: '⚠️',
      };
    } else if (qtynk > 0) {
      return {
        message: `Only ${qtynk} left!`,
        class: 'text-red-500 font-semibold',
        icon: '❗',
      };
    } else {
      return {
        message: 'Out of Stock',
        class: 'text-gray-400 font-semibold',
        icon: '❌',
      };
    }
  }
}
  