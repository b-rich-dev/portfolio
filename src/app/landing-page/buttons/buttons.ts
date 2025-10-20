import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss'
})
export class Buttons {

  // start the marquee animation for the hovered button
  startMarquee(event: MouseEvent) {
    const anchor = this.getAnchorElement(event);
    if (!anchor) return;

    this.cleanupPreviousAnimation(anchor);
    this.hideLabel(anchor);
    this.startOrRestartMarquee(anchor);
  }

  // stop marquee and smoothly return to start position
  stopMarquee(event: MouseEvent) {
    const anchor = this.getAnchorElement(event);
    if (!anchor) return;

    const wrap = this.getTextWrap(anchor);
    if (!wrap) {
      this.removeMarqueeClass(anchor);
      return;
    }

    this.stopAnimationAtCurrentPosition(wrap);
    this.transitionBackToStart(wrap);
    this.setupCleanupAfterTransition(anchor, wrap);
  }

  private getAnchorElement(event: MouseEvent): HTMLElement | null {
    return (event.currentTarget || event.target) as HTMLElement;
  }

  private getTextWrap(anchor: HTMLElement): HTMLElement | null {
    return anchor.querySelector('.text-wrap') as HTMLElement | null;
  }

  private getLabel(anchor: HTMLElement): HTMLElement | null {
    return anchor.querySelector('.label') as HTMLElement | null;
  }

  private cleanupPreviousAnimation(anchor: HTMLElement) {
    const wrap = this.getTextWrap(anchor);
    if (!wrap) return;

    this.clearInlineStyles(wrap);
    this.cancelPendingTimeouts(wrap);
  }

  private clearInlineStyles(wrap: HTMLElement) {
    wrap.style.transition = '';
    wrap.style.animation = '';
    wrap.style.transform = '';
    
    // Also clear inline color styles from text elements
    const textElements = wrap.querySelectorAll('.text') as NodeListOf<HTMLElement>;
    textElements.forEach(text => {
      text.style.color = '';
      text.style.transition = '';
    });
  }

  private cancelPendingTimeouts(wrap: HTMLElement) {
    const existingTimeout = (wrap as any).__marqueeTimeout as number | undefined;
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      delete (wrap as any).__marqueeTimeout;
    }
  }

  private hideLabel(anchor: HTMLElement) {
    const label = this.getLabel(anchor);
    if (!label) return;

    label.style.transition = 'opacity 120ms linear';
    label.style.opacity = '0';
    
    // Remove inline transition after animation completes
    setTimeout(() => {
      if (label) label.style.transition = '';
    }, 150);
  }

  private startOrRestartMarquee(anchor: HTMLElement) {
    const wrap = this.getTextWrap(anchor);
    if (!wrap) return;

    const isReturning = this.isReturningToStart(wrap);
    
    if (isReturning) {
      this.markForRestart(wrap);
    } else {
      this.addMarqueeClass(anchor);
    }
  }

  private isReturningToStart(wrap: HTMLElement): boolean {
    return !!(wrap as any).__marqueeReturning;
  }

  private markForRestart(wrap: HTMLElement) {
    (wrap as any).__marqueeWantToRun = true;
  }

  private addMarqueeClass(anchor: HTMLElement) {
    anchor.classList.add('marquee-active');
  }

  private removeMarqueeClass(anchor: HTMLElement) {
    anchor.classList.remove('marquee-active');
  }

  private stopAnimationAtCurrentPosition(wrap: HTMLElement) {
    const currentTransform = window.getComputedStyle(wrap).transform;
    
    wrap.style.animation = 'none';
    wrap.style.transform = currentTransform === 'none' ? 'translateX(0)' : currentTransform;
    
    // Immediately change color to white when stopping animation
    const textElements = wrap.querySelectorAll('.text') as NodeListOf<HTMLElement>;
    textElements.forEach(text => {
      text.style.color = 'var(--white)';
      text.style.transition = 'color 0.1s ease-out';
    });
    
    // Force browser to apply styles
    wrap.offsetWidth;
  }

  private transitionBackToStart(wrap: HTMLElement) {
    wrap.style.transition = 'transform 600ms cubic-bezier(.22,.9,.38,1), opacity 220ms linear';
    wrap.style.transform = 'translateX(0)';
    (wrap as any).__marqueeReturning = true;
  }

  private setupCleanupAfterTransition(anchor: HTMLElement, wrap: HTMLElement) {
    this.removeExistingCleanupListener(wrap);
    
    const cleanup = this.createCleanupFunction(anchor, wrap);
    this.addCleanupListener(wrap, cleanup);
    this.setupFallbackTimeout(wrap, cleanup);
  }

  private removeExistingCleanupListener(wrap: HTMLElement) {
    const existingCleanup = (wrap as any).__marqueeCleanup;
    if (existingCleanup) {
      wrap.removeEventListener('transitionend', existingCleanup);
    }
  }

  private createCleanupFunction(anchor: HTMLElement, wrap: HTMLElement) {
    return (ev?: TransitionEvent) => {
      if (ev && ev.propertyName !== 'transform') return;

      if (this.shouldRestart(wrap)) {
        this.handleRestart(anchor, wrap);
        return;
      }

      this.finishTransition(anchor, wrap);
    };
  }

  private shouldRestart(wrap: HTMLElement): boolean {
    return !!(wrap as any).__marqueeWantToRun;
  }

  private handleRestart(anchor: HTMLElement, wrap: HTMLElement) {
    this.clearRestartFlags(wrap);
    this.resetForRestart(wrap);
    this.ensureLabelHidden(anchor);
    this.delayedAnimationReset(wrap);
    this.cleanupListeners(wrap);
  }

  private clearRestartFlags(wrap: HTMLElement) {
    delete (wrap as any).__marqueeWantToRun;
    delete (wrap as any).__marqueeReturning;
  }

  private resetForRestart(wrap: HTMLElement) {
    this.clearInlineStyles(wrap);
    wrap.offsetWidth; // Force reflow
  }

  private ensureLabelHidden(anchor: HTMLElement) {
    const label = this.getLabel(anchor);
    if (label) {
      label.style.opacity = '0';
    }
  }

  private delayedAnimationReset(wrap: HTMLElement) {
    setTimeout(() => {
      wrap.style.animation = '';
    }, 20);
  }

  private finishTransition(anchor: HTMLElement, wrap: HTMLElement) {
    this.removeMarqueeClass(anchor);
    
    // Keep white color as inline style to prevent CSS turquoise from showing
    const textElements = wrap.querySelectorAll('.text') as NodeListOf<HTMLElement>;
    textElements.forEach(text => {
      text.style.color = 'var(--white)';
    });
    
    this.clearReturnFlag(wrap);
    this.cleanupListeners(wrap);
    this.restoreLabel(anchor);
    
    // Clear other inline styles but keep white color temporarily
    wrap.style.transition = '';
    wrap.style.animation = '';
    wrap.style.transform = '';
    
    // Remove color styles after a brief delay to ensure no flash
    setTimeout(() => {
      textElements.forEach(text => {
        text.style.color = '';
        text.style.transition = '';
      });
    }, 100);
  }

  private clearReturnFlag(wrap: HTMLElement) {
    delete (wrap as any).__marqueeReturning;
  }

  private restoreLabel(anchor: HTMLElement) {
    const label = this.getLabel(anchor);
    if (label) {
      label.style.opacity = '';
      label.style.transition = '';
    }
  }

  private cleanupListeners(wrap: HTMLElement) {
    const cleanup = (wrap as any).__marqueeCleanup;
    if (cleanup) {
      wrap.removeEventListener('transitionend', cleanup);
      delete (wrap as any).__marqueeCleanup;
    }
    
    this.clearTimeout(wrap);
  }

  private clearTimeout(wrap: HTMLElement) {
    const timeout = (wrap as any).__marqueeTimeout;
    if (timeout) {
      clearTimeout(timeout);
      delete (wrap as any).__marqueeTimeout;
    }
  }

  private addCleanupListener(wrap: HTMLElement, cleanup: (ev?: TransitionEvent) => void) {
    (wrap as any).__marqueeCleanup = cleanup;
    wrap.addEventListener('transitionend', cleanup);
  }

  private setupFallbackTimeout(wrap: HTMLElement, cleanup: (ev?: TransitionEvent) => void) {
    const timeout = setTimeout(() => {
      const currentCleanup = (wrap as any).__marqueeCleanup;
      if (currentCleanup) currentCleanup();
    }, 900);
    
    (wrap as any).__marqueeTimeout = timeout;
  }
}
