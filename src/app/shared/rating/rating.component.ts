import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Input() rating = 0;
  @Output() rate = new EventEmitter<number>();
  ratings = [1,2,3,4,5];
  emit(n: number) { this.rate.emit(n); }
}
