import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  // start the marquee animation for the hovered button
  startMarquee(event: MouseEvent) {
    const anchor = (event.currentTarget || event.target) as HTMLElement;
    if (!anchor) return;

    // clean any inline stop styles from previous interactions
    const wrap = anchor.querySelector('.text-wrap') as HTMLElement | null;
    if (wrap) {
      wrap.style.transition = '';
      wrap.style.animation = '';
      wrap.style.transform = '';
      // cancel any pending cleanup timeout from previous stop
      const existingTimeout = (wrap as any).__marqueeTimeout as number | undefined;
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        try { delete (wrap as any).__marqueeTimeout; } catch {}
      }
    }

    // ensure any inline styles on the visible label are removed so
    // the CSS rule (.label { opacity: 0 }) from .marquee-active can take effect
    const label = anchor.querySelector('.label') as HTMLElement | null;
    if (label) {
      // quickly hide the label inline so the marquee appears without visible delay
      label.style.transition = 'opacity 120ms linear';
      label.style.opacity = '0';
      // remove inline transition after it's done to allow CSS to control later
      window.setTimeout(() => { try { label.style.transition = ''; } catch {} }, 150);
    }

    // If the wrap is currently returning to start, mark that we want to restart
    const returning = wrap ? !!(wrap as any).__marqueeReturning : false;
    if (returning && wrap) {
      (wrap as any).__marqueeWantToRun = true;
    } else {
      anchor.classList.add('marquee-active');
    }
  }

  // stop marquee and smoothly return to start position
  stopMarquee(event: MouseEvent) {
    const anchor = (event.currentTarget || event.target) as HTMLElement;
    if (!anchor) return;

    const wrap = anchor.querySelector('.text-wrap') as HTMLElement | null;
    const label = anchor.querySelector('.label') as HTMLElement | null;
    if (!wrap) {
      anchor.classList.remove('marquee-active');
      return;
    }

    // get computed transform (matrix) while animation is running
    const computed = window.getComputedStyle(wrap).transform;

    // stop the CSS animation but keep the current visual transform
    wrap.style.animation = 'none';
    // set the transform to the computed value (so element doesn't jump)
    wrap.style.transform = computed === 'none' ? 'translateX(0)' : computed;

    // force reflow so the browser applies the styles above
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wrap.offsetWidth;

    // now transition back to the start (translateX(0)) smoothly
  wrap.style.transition = 'transform 600ms cubic-bezier(.22,.9,.38,1), opacity 220ms linear';
    wrap.style.transform = 'translateX(0)';
  // mark that we're currently returning; used to resume if hover comes back
  (wrap as any).__marqueeReturning = true;

    // We will remove the marquee-active class only after the return transition ends
    // so the label will not overlap the moving text.
    // ensure we don't accumulate multiple listeners
    const existingCleanup = (wrap as any).__marqueeCleanup as ((ev?: TransitionEvent) => void) | undefined;
    if (existingCleanup) {
      wrap.removeEventListener('transitionend', existingCleanup);
    }

    const cleanup = (ev?: TransitionEvent) => {
      if (ev && ev.propertyName !== 'transform') return;
      // if the user wanted to restart during return, restart animation cleanly
      const want = (wrap as any).__marqueeWantToRun as boolean | undefined;
      if (want) {
        try { delete (wrap as any).__marqueeWantToRun; } catch {}

        // clear returning flag
        try { delete (wrap as any).__marqueeReturning; } catch {}

        // clear inline styles from return animation
        wrap.style.transition = '';
        wrap.style.animation = '';
        wrap.style.transform = '';
        // force reflow
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        wrap.offsetWidth;

        // ensure label stays hidden
        if (label) {
          label.style.opacity = '0';
        }

        // restart the marquee by ensuring the class remains and removing any inline animation
        // (the CSS rule for .marquee-active will re-apply the animation)
        // small delay to allow browser to apply cleared styles
        window.setTimeout(() => {
          try { wrap.style.animation = ''; } catch {}
        }, 20);

        // cleanup and return early
        wrap.removeEventListener('transitionend', cleanup);
        try { delete (wrap as any).__marqueeCleanup; } catch {}
        const t = (wrap as any).__marqueeTimeout as number | undefined;
        if (t) { clearTimeout(t); try { delete (wrap as any).__marqueeTimeout; } catch {} }
        return;
      }

      // remove the active class so CSS shows the label again
      anchor.classList.remove('marquee-active');

      wrap.style.transition = '';
      wrap.style.animation = '';
      wrap.style.transform = '';
  // clear returning flag
  try { delete (wrap as any).__marqueeReturning; } catch {}
      wrap.removeEventListener('transitionend', cleanup);
      try { delete (wrap as any).__marqueeCleanup; } catch {}

      // clear any fallback timeout
      const t = (wrap as any).__marqueeTimeout as number | undefined;
      if (t) {
        clearTimeout(t);
        try { delete (wrap as any).__marqueeTimeout; } catch {}
      }
      // ensure the visible label is restored (remove inline styles)
      if (label) {
        label.style.opacity = '';
        label.style.transition = '';
      }
    };

    (wrap as any).__marqueeCleanup = cleanup;
    wrap.addEventListener('transitionend', cleanup);

    // fallback: if transitionend doesn't fire, ensure cleanup after 900ms
    const timeout = window.setTimeout(() => {
      const fn = (wrap as any).__marqueeCleanup as ((ev?: TransitionEvent) => void) | undefined;
      if (fn) fn();
    }, 900);
    (wrap as any).__marqueeTimeout = timeout;
  }
}
