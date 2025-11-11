import { Component, signal, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { FaviconService } from './services/favicon.service';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { LandscapeModus } from './shared/landscape-modus/landscape-modus';
import { isPlatformBrowser } from '@angular/common';

/**
 * Root Application Component
 * 
 * Handles the main application structure including:
 * - Initializing favicon service
 * - Setting up the main layout with header, footer, and router outlet
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer,
    LandscapeModus
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('Eugen Birich - Frontend Developer | Web Developer Portfolio');
  private glowElement?: HTMLElement;

  /** Initializes the favicon service and sets up platform detection */
  constructor(
    favicon: FaviconService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    favicon.init('/transparent_logo_b_light.png', '/transparent_logo_b_dark.png');
  }

  /** Initializes the optimized glow effect for mouse interaction */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initOptimizedGlowEffect();
    }
  }

  /** Cleans up the glow effect on component destruction */
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.removeOptimizedGlowEffect();
    }
  }

  /** Initializes the optimized glow effect for mouse interaction */
  private initOptimizedGlowEffect() {
    if (typeof document === 'undefined') return;

    this.createGlowElement();
    this.attachGlowEventListeners();
  }

  /** Creates the glow element and appends it to the document body */
  private createGlowElement() {
    this.glowElement = document.createElement('div');
    this.glowElement.id = 'mouse-glow';
    document.body.appendChild(this.glowElement);
  }

  /** Attaches event listeners for mouse movement and visibility changes */
  private attachGlowEventListeners() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this), { passive: true });
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this), { passive: true });
  }

  /** Handles mouse move events to update the glow element's position */
  private handleMouseMove(e: MouseEvent) {
    if (this.glowElement) {
      this.glowElement.style.transform = `translate3d(${e.clientX - 90}px, ${e.clientY - 90}px, 0)`;
    }
  }

  /** Handles mouse enter events to show the glow element */
  private handleMouseEnter() {
    if (this.glowElement) {
      this.glowElement.style.opacity = '1';
    }
  }

  /** Handles mouse leave events to hide the glow element */
  private handleMouseLeave() {
    if (this.glowElement) {
      this.glowElement.style.opacity = '0';
    }
  }

  /** Removes the glow element from the document */
  private removeOptimizedGlowEffect() {
    if (typeof document === 'undefined') return;

    if (this.glowElement) {
      this.glowElement.remove();
    }
  }
}
