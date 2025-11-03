import { Component, signal, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { FaviconService } from './services/favicon.service';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('portfolio');
  private glowElement?: HTMLElement;

  constructor(
    favicon: FaviconService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // initialize favicon switching based on browser theme
    // icons are expected at the project root (public/) as /favicon-light.png and /favicon-dark.png
    // Use the transparent logo files placed in public/ as favicons
    favicon.init('/transparent_logo_b_light.png', '/transparent_logo_b_dark.png');
  }

  ngAfterViewInit() {
    // Nur im Browser ausführen, nicht bei SSR
    if (isPlatformBrowser(this.platformId)) {
      this.initOptimizedGlowEffect();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.removeOptimizedGlowEffect();
    }
  }

  private initOptimizedGlowEffect() {
    if (typeof document === 'undefined') return;

    // Create the glow element
    this.glowElement = document.createElement('div');
    this.glowElement.id = 'mouse-glow';
    document.body.appendChild(this.glowElement);

    // Direkter, sofortiger Glow-Effekt zentriert auf Mauszeiger-Spitze
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.glowElement) {
        // Perfekt auf Mauszeiger-Spitze zentriert (80px = halbe Größe von 160px)
        // Leichter Offset für exakte Spitzen-Positionierung
        this.glowElement.style.transform = `translate3d(${e.clientX - 90}px, ${e.clientY - 90}px, 0)`;
      }
    }, { passive: true });

    // Sofortige Reaktion bei Mouse Enter/Leave
    document.addEventListener('mouseenter', () => {
      if (this.glowElement) {
        this.glowElement.style.opacity = '1';
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      if (this.glowElement) {
        this.glowElement.style.opacity = '0';
      }
    }, { passive: true });
  }

  private removeOptimizedGlowEffect() {
    if (typeof document === 'undefined') return;

    // Remove the glow element
    if (this.glowElement) {
      this.glowElement.remove();
    }
  }
}
