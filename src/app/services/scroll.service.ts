import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
