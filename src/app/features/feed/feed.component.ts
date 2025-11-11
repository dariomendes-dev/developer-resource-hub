import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent {
  view: 'cards' | 'table' = 'cards';
  resourceService = inject(ResourceService);
  filtered = this.resourceService.filteredResources;
  categories = ['All', 'Frontend','Backend','DevOps','General'];

  delete(id: number) {
    if (confirm('Delete this resource?')) this.resourceService.delete(id);
  }
}
