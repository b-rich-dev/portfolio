import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FaviconService {
  private lightFavicon = '/favicon-light.png';
  private darkFavicon = '/favicon-dark.png';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Initialize the favicon handling. Call from app startup (e.g. App constructor).
   * You can pass custom paths if your icons are placed elsewhere.
   */
  init(lightPath?: string, darkPath?: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (lightPath) this.lightFavicon = lightPath;
    if (darkPath) this.darkFavicon = darkPath;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    this.setFavicon(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener('change', (e: MediaQueryListEvent) => this.setFavicon(e.matches));
    } else if ((mq as any).addListener) {
      (mq as any).addListener((e: MediaQueryListEvent) => this.setFavicon(e.matches));
    }
  }

  /** Set the favicon href depending on whether dark mode is active */
  private setFavicon(isDark: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    const href = isDark ? this.lightFavicon : this.darkFavicon;

    let link = document.querySelector('link[rel~="icon"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.id = 'app-favicon';
      document.head.appendChild(link);
    }

    this.preloadImage(href)
      .then(() => {
        link!.href = href;
      })
      .catch(() => {
      });
  }

  private preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  }
}
