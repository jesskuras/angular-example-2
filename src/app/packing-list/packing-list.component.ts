import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingItem } from '../packing-item';

@Component({
  selector: 'app-packing-list',
  imports: [CommonModule],
  templateUrl: './packing-list.component.html',
  styleUrl: './packing-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackingListComponent {
  items = input.required<PackingItem[]>();
  addItem = output<{ name: string; category: string }>();
  togglePacked = output<number>();

  newItemName = signal('');
  newItemCategory = signal('Clothes');
  filter = signal<'all' | 'packed' | 'unpacked'>('all');

  groupedItems = computed(() => {
    const items = this.items();
    const filteredItems = items.filter((item: PackingItem) => {
        if (this.filter() === 'packed') return item.packed;
        if (this.filter() === 'unpacked') return !item.packed;
        return true;
    });

    const grouped = new Map<string, PackingItem[]>();
    for (const item of filteredItems) {
      const category = item.category;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(item);
    }
    return grouped;
  });

  categories = computed(() => Array.from(this.groupedItems().keys()));

  onAddItem() {
    const name = this.newItemName().trim();
    if (name) {
      this.addItem.emit({ name, category: this.newItemCategory() });
      this.newItemName.set('');
    }
  }
}
