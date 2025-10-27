import { Component } from '@angular/core';
import { PackingListComponent } from './packing-list/packing-list';

@Component({
  selector: 'app-root',
  imports: [PackingListComponent],
  template: `<app-packing-list />`,
})
export class App {}
