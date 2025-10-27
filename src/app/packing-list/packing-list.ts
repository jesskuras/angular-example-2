import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PackingListService } from '../packing-list.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackingItem } from '../packing-item';
import { SummaryComponent } from '../summary/summary';

@Component({
  selector: 'app-packing-list',
  imports: [CommonModule, ReactiveFormsModule, SummaryComponent],
  templateUrl: './packing-list.html',
  styleUrl: './packing-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackingListComponent {
  private packingListService = inject(PackingListService);
  private fb = inject(FormBuilder);

  items = this.packingListService.getItems();
  filter = signal<'All' | 'Packed' | 'Unpacked'>('All');

  // Computed signal to filter and group items
  groupedItems = computed(() => {
    const filteredItems = this.items().filter(item => {
        if (this.filter() === 'Packed') return item.packed;
        if (this.filter() === 'Unpacked') return !item.packed;
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

  // Expose the categories for the template
  categories = computed(() => Array.from(this.groupedItems().keys()));

  newItemForm = this.fb.group({
    name: ['', Validators.required],
    category: ['Miscellaneous', Validators.required],
  });

  addItem() {
    if (this.newItemForm.valid) {
      const { name, category } = this.newItemForm.value;
      if (name && category) {
          this.packingListService.addItem({ name, category });
          this.newItemForm.reset({ name: '', category: 'Miscellaneous' });
      }
    }
  }

  togglePacked(id: number) {
    this.packingListService.togglePacked(id);
  }

  setFilter(filter: 'All' | 'Packed' | 'Unpacked') {
    this.filter.set(filter);
  }
}
