import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../../core/models/resource';
import { RatingComponent } from '../../../../shared/rating/rating.component';
import { ResourceService } from '../../../../core/services/resource.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule, RatingComponent, RouterLink],
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  @Input() resources: Resource[] = [];
  resourceService = inject(ResourceService);

    onRate(id: number, value: number) {
    this.resourceService.setRating(id, value);
  }

    onDelete(id: number) {
    this.resourceService.delete(id);
  }
}
