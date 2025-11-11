import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../core/services/resource.service';
import { ALL_CATEGORIES, Resource } from '../../core/models/resource';
import { ActivatedRoute, Router } from '@angular/router';

type ResourceForm = Omit<Resource, 'id' | 'rating'>;

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-manage-resource',
  templateUrl: './manage-resource.component.html',
  styleUrl: './manage-resource.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageResourceComponent implements OnInit {
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories = ALL_CATEGORIES;
  isEdit = false;
  showSuccess = signal(false);
  currentId?: number;

  form = this.fb.group({
    title: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    url: this.fb.control('', [Validators.required, Validators.pattern('https?://.+')]),
    category: this.fb.control(this.categories[0], Validators.required),
  });

  ngOnInit() {
    this.currentId = Number(this.route.snapshot.paramMap.get('id')) || undefined;
    if (this.currentId) {
      const res = this.resourceService.findById(this.currentId);
      if (!res) {
        this.router.navigate(['/']);
        return;
      }
      this.form.patchValue({ title: res.title, url: res.url, category: res.category });
      this.isEdit = true;
    }
  }

  save() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    const { title, url, category } = this.form.value;
    const payload: ResourceForm = {
      title: title ?? '',
      url: url ?? '',
      category: category ?? '',
    };
    if (this.isEdit && this.currentId) {
      this.resourceService.update(this.currentId, payload);
    } else {
      this.resourceService.add(payload);
    }
    this.displaySuccess();
    if (!this.isEdit) {
      this.form.reset();
    }
    //this.router.navigate(['/']);
  }

  displaySuccess() {
    this.showSuccess.set(true);
    setTimeout(() => {
      this.showSuccess.set(false);
    }, 2000);
  }
}
