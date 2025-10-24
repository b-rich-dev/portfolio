import { Component } from '@angular/core';
import { LandingPage } from '../landing-page/landing-page';
import { AboutMe } from '../about-me/about-me';
import { SkillSet } from '../skill-set/skill-set';
import { FeaturedProjects } from '../featured-projects/featured-projects';

@Component({
  selector: 'app-main',
  imports: [
    LandingPage,
    AboutMe,
    SkillSet,
    FeaturedProjects
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
