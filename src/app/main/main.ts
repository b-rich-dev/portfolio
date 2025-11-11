import { Component } from '@angular/core';
import { LandingPage } from '../landing-page/landing-page';
import { AboutMe } from '../about-me/about-me';
import { SkillSet } from '../skill-set/skill-set';
import { FeaturedProjects } from '../featured-projects/featured-projects';
import { Social } from '../social/social';
import { Contact } from '../contact/contact';

/**
 * Main Component
 * Handles the main application layout including:
 * - Integrating various sections like landing page, about me, skills, projects, social links, and contact form
 * @author Eugen Birich
 * @version 1.0.0
 */
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    LandingPage,
    AboutMe,
    SkillSet,
    FeaturedProjects,
    Social,
    Contact
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
