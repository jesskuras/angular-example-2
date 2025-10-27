import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingItem } from './packing-item';
import { PackingListComponent } from './packing-list/packing-list.component';
import { SummaryComponent } from './summary/summary.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PackingListComponent, SummaryComponent],
  template: `
    <app-summary [items]="items()" />
    <app-packing-list 
      [items]="items()" 
      (addItem)="onAddItem($event)" 
      (togglePacked)="onTogglePacked($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  items = signal<PackingItem[]>([
    { id: 1, name: 'T-shirts', category: 'Clothes', packed: false },
    { id: 2, name: 'Socks', category: 'Clothes', packed: true },
    { id: 3, name: 'Toothbrush', category: 'Toiletries', packed: false },
    { id: 4, name: 'Passport', category: 'Documents', packed: false },
  ]);

  onAddItem(item: { name: string; category: string }) {
    const newItem: PackingItem = {
      ...item,
      id: Date.now(),
      packed: false,
    };
    this.items.update((items) => [...items, newItem]);
  }

  onTogglePacked(id: number) {
    this.items.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
}
