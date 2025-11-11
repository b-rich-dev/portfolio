import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Favicon Service
 * Manages dynamic favicon switching based on the user's color scheme preference (light/dark mode).
 * 
 * Features:
 * - Automatically switches favicon based on system color scheme
 * - Supports custom favicon paths
 * - Preloads favicon images for smooth transitions
 * - Compatible with server-side rendering
 * 
 * @author Eugen Birich
 * @version 1.0.0
 */
@Injectable({ providedIn: 'root' })
export class FaviconService {
  private lightFavicon: string = '/favicon-light.png';
  private darkFavicon: string = '/favicon-dark.png';

  /** Platform ID for SSR compatibility */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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

    const handleChange = (e: MediaQueryListEvent) => { this.setFavicon(e.matches); };

    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else if ((mq as any).addListener) (mq as any).addListener(handleChange);
  }

  /** Set the favicon href depending on whether dark mode is active */
  private setFavicon(isDark: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    const href = isDark ? this.lightFavicon : this.darkFavicon;

    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(l => l.remove());

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.id = 'app-favicon';
    document.head.appendChild(link);

    this.preloadImage(href)
      .then(() => {
        link.href = href;
      })
      .catch((error) => {
        link.href = href;
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
