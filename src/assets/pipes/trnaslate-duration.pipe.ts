import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'translateDuration'
})
export class TranslateDurationPipe implements PipeTransform {

  transform(minutes: any, ...args: unknown[]): unknown {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${hours}h ${minutesLeft}m`
  }

}
