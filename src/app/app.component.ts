import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PackingListComponent } from './packing-list/packing-list.component';
import { SummaryComponent } from './summary/summary.component';

@Component({
  selector: 'app-root',
  imports: [PackingListComponent, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
