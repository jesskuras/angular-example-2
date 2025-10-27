import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingListService } from '../packing-list.service';
import { PackingItem } from '../packing-item';

@Component({
  selector: 'app-packing-list',
  imports: [CommonModule],
  templateUrl: './packing-list.html',
  styleUrls: ['./packing-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackingListComponent {
  private packingListService = inject(PackingListService);

  filter = signal<'all' | 'packed' | 'unpacked'>('all');

  items = this.packingListService.getItems();

  filteredItems = computed(() => {
    const items = this.items();
    switch (this.filter()) {
      case 'packed':
        return items.filter((item) => item.packed);
      case 'unpacked':
        return items.filter((item) => !item.packed);
      default:
        return items;
    }
  });

  groupedItems = computed(() => {
    return this.filteredItems().reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as { [key: string]: PackingItem[] });
  });

  categories = computed(() => Object.keys(this.groupedItems()));

  newItemName = signal('');
  newItemCategory = signal('Clothes');

  addItem() {
    if (this.newItemName().trim()) {
      this.packingListService.addItem({
        name: this.newItemName().trim(),
        category: this.newItemCategory(),
      });
      this.newItemName.set('');
    }
  }

  togglePacked(id: number) {
    this.packingListService.togglePacked(id);
  }
}
