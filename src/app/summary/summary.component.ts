import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingListService } from '../packing-list.service';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  private packingListService = inject(PackingListService);
  private items = this.packingListService.getItems();

  totalItems = computed(() => this.items().length);
  packedItems = computed(() => this.items().filter((item) => item.packed).length);
  percentagePacked = computed(() => {
    if (this.totalItems() === 0) {
      return 0;
    }
    return Math.round((this.packedItems() / this.totalItems()) * 100);
  });
}
