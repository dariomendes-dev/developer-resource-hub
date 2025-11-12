import { Injectable, signal, computed, effect } from '@angular/core';
import { Resource } from '../models/resource';
import data from '../constants/data.json';

function uid(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0];
}

@Injectable({ providedIn: 'root' })
export class ResourceService {
  useLocalStorage: boolean = false;
  
  private _resources = signal<Resource[]>([]);
  readonly resources = this._resources;

  availableCategories = computed(() => ['All', ...new Set(this._resources().map((resource) => resource.category)),]);
  filterCategory = signal<string>('All');
  filteredResources = computed(() => {
    const category = this.filterCategory();
    const arr = this._resources();
    return category === 'All' ? arr : arr.filter((resource) => resource.category === category);
  });

  constructor() {
    let initial: Resource[] = data;

    if (this.useLocalStorage) {
      try {
        const raw = localStorage.getItem('devhub:resources');
        if (raw) {
          initial = JSON.parse(raw);
        }
      } catch (err) {
        console.error('Failed to load from localStorage', err);
      }
    }

    this._resources.set(initial);

    //persist changes only if using localStorage
    if (this.useLocalStorage) {
      effect(() => {
        try {
          localStorage.setItem('devhub:resources', JSON.stringify(this._resources()));
        } catch {}
      });
    }

    //check if the selected category does not exist anymore and sets category to 'All'
    effect(() => {
      const category = this.filterCategory();
      const available = this.availableCategories();
      if (category !== 'All' && !available.includes(category)) {
        this.filterCategory.set('All');
      }
    });
  }

  //make a new resource, append it to the array, update the signal, return its id
  add(resource: Omit<Resource, 'id' | 'rating'>) {
    const item: Resource = { ...resource, id: uid(), rating: 0 };
    this._resources.update((curr) => [...curr, item]);
    return item.id;
  }

  //find the resource by id, merge changes, leave everything else intact
  update(id: number, patch: Partial<Omit<Resource, 'id'>>) {
    this._resources.update((curr) =>
      curr.map((resource) => (resource.id === id ? { ...resource, ...patch } : resource))
    );
  }

  delete(id: number) {
    this._resources.update((curr) => curr.filter((resource) => resource.id !== id));
  }

  setRating(id: number, rating: number) {
    const current = this._resources().find((resource) => resource.id === id);
    if (!current) return;
    const newRating = current.rating === rating ? 0 : rating;
    this.update(id, { rating: newRating });
  }

  findById(id: number) {
    return this._resources().find((r) => r.id === id);
  }

  setFilter(category: string) {
    this.filterCategory.set(category);
  }
}
