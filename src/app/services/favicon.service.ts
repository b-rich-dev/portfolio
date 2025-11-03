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

    // Event-Listener für Theme-Änderungen
    const handleChange = (e: MediaQueryListEvent) => {
      console.log('Theme changed:', e.matches ? 'dark' : 'light');
      this.setFavicon(e.matches);
    };

    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange);
    } else if ((mq as any).addListener) {
      // Fallback für ältere Browser
      (mq as any).addListener(handleChange);
    }
  }

  /** Set the favicon href depending on whether dark mode is active */
  private setFavicon(isDark: boolean) {
    if (!isPlatformBrowser(this.platformId)) return;

    const href = isDark ? this.lightFavicon : this.darkFavicon;

    // Entferne ALLE bestehenden Favicon-Links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(l => l.remove());
    
    // Erstelle neuen Favicon-Link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.id = 'app-favicon';
    document.head.appendChild(link);

    this.preloadImage(href)
      .then(() => {
        link.href = href;
        console.log(`Favicon successfully set: ${href}`);
      })
      .catch((error) => {
        console.error(`Failed to load favicon: ${href}`, error);
        // Fallback: setze direkt ohne preload
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
