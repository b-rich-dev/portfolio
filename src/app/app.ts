import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Header } from './shared/header/header';
import { AboutMe } from './about-me/about-me';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPage, Header, AboutMe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
