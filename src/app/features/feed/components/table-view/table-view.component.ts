import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../../core/models/resource';
import { ResourceService } from '../../../../core/services/resource.service';
import { RatingComponent } from '../../../../shared/rating/rating.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, RatingComponent, RouterLink],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class TableViewComponent {
  @Input() resources: Resource[] = [];
  resourceService = inject(ResourceService);

  onRate(id: number, val: number) {
    this.resourceService.setRating(id, val);
  }

  onDelete(id: number) {
    this.resourceService.delete(id);
  }
}
