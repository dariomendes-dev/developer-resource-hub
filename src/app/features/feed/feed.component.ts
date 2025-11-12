import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../core/services/resource.service';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { TableViewComponent } from './components/table-view/table-view.component';

@Component({
  standalone: true,
  imports: [CommonModule, CategoryFilterComponent, CardViewComponent, TableViewComponent],
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  resourceService = inject(ResourceService);
  view: 'cards' | 'table' = 'table';
  filtered = this.resourceService.filteredResources;

  currentPage = signal(1);
  pageSize = signal(12);
  totalPages = computed(() => Math.ceil(this.filtered().length / this.pageSize()));

  pagedResources = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    window.scroll({ top: 0, behavior: 'smooth' });
    return this.filtered().slice(start, end);
  });

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onPageSize(e: Event) {
    this.pageSize.set(Number((e.target as HTMLSelectElement).value));
  }

  delete(id: number) {
    if (confirm('Delete this resource?')) this.resourceService.delete(id);
  }
}
