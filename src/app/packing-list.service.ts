import { Injectable, signal } from '@angular/core';
import { PackingItem } from './packing-item';

@Injectable({
  providedIn: 'root',
})
export class PackingListService {
  private items = signal<PackingItem[]>([]);

  getItems() {
    return this.items.asReadonly();
  }

  addItem(item: Omit<PackingItem, 'id' | 'packed'>) {
    const newItem: PackingItem = {
      ...item,
      id: Date.now(),
      packed: false,
    };
    this.items.update((items) => [...items, newItem]);
  }

  togglePacked(id: number) {
    this.items.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
}
