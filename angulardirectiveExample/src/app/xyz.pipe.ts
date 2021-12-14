import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xyz'
})
export class XyzPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
