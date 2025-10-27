import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PackingItem } from '../packing-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  items = input.required<PackingItem[]>();

  totalItems = computed(() => this.items().length);
  packedItems = computed(() => this.items().filter((item) => item.packed).length);
  percentagePacked = computed(() => {
    if (this.totalItems() === 0) {
      return 0;
    }
    return Math.round((this.packedItems() / this.totalItems()) * 100);
  });
}
