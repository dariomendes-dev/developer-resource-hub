import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Output() changeCategory = new EventEmitter<string>();
  onChange(e: Event) {
    this.changeCategory.emit((e.target as HTMLSelectElement).value);
  }
}
