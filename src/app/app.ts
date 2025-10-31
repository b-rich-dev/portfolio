import { Component, signal } from '@angular/core';
import { FaviconService } from './services/favicon.service';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

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
export class App {
  protected readonly title = signal('portfolio');

  constructor(favicon: FaviconService) {
    // initialize favicon switching based on browser theme
    // icons are expected at the project root (public/) as /favicon-light.png and /favicon-dark.png
    // Use the transparent logo files placed in public/ as favicons
    favicon.init('/transparent_logo_b_light.png', '/transparent_logo_b_dark.png');
  }
}
