import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly SEARCH_FILTER_KEY = 'searchFilter';
  private readonly STATUS_FILTER_KEY = 'statusFilter';

  constructor() {}

  getSearchFilter(): string {
    return localStorage.getItem(this.SEARCH_FILTER_KEY) || '';
  }

  getStatusFilter(): string {
    return localStorage.getItem(this.STATUS_FILTER_KEY) || '';
  }

  setSearchFilter(value: string): void {
    localStorage.setItem(this.SEARCH_FILTER_KEY, value);
  }

  setStatusFilter(value: string): void {
    localStorage.setItem(this.STATUS_FILTER_KEY, value);
  }

  clearFilters(): void {
    localStorage.removeItem(this.SEARCH_FILTER_KEY);
    localStorage.removeItem(this.STATUS_FILTER_KEY);
  }
}
