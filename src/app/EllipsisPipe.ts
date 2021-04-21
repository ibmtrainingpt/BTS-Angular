import { Pipe } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe {
  transform(text, args) {
    if (args === undefined) {
      return text;
    }

    if (text.length > args) {
      return text.substring(0, args) + '...';
    } else {
      return text;
    }
  }
}
