import { Component, inject, Signal } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-social',
  imports: [],
  templateUrl: './social.html',
  styleUrl: './social.scss'
})
export class Social {
  public currentLanguage: Signal<'en' | 'de'> = inject(LanguageService).language;
  commentWidth = 590;
  gap = 100;
  slideOffset = 0;
  disableTransition = false;
  isAnimating = false;
  transitionDurationMs = 350;

  calcTranslateX(index: number): number {
    const totalWidth = this.comments.length * this.commentWidth + (this.comments.length - 1) * this.gap;
    const containerCenter = totalWidth / 2;
    const activePos = index * (this.commentWidth + this.gap) + this.commentWidth / 2;
    return containerCenter - activePos;
  }

  activeCommentIndex = 1;
  comments = [
    {
      textEn: `Working with Eugen was a great experience. His reliable, conscientious, and team-oriented approach helped us achieve excellent results together. I especially value his openness, expertise, and solution-focused mindset – I can fully recommend collaborating with him.`,
      textDe: `Die Zusammenarbeit mit Eugen war äußerst angenehm und erfolgreich. Durch seine zuverlässige, gewissenhafte und teamorientierte Arbeitsweise konnten wir gemeinsam starke Ergebnisse erzielen. Besonders schätze ich seine Offenheit, Fachkompetenz und lösungsorientierte Haltung – eine Zusammenarbeit, die ich uneingeschränkt empfehlen kann.`,
      authorEn: 'Mathias Johann Josef Voigt - Team Partner',
      authorDe: 'Mathias Johann Josef Voigt - Teamkollege'
    },
    {
      textEn: `He works in a very structured and efficient manner, enabling tasks to be completed quickly and accurately. Particularly impressive is his ability to quickly and confidently familiarize himself with existing code. He has solid knowledge of HTML, CSS, JavaScript, TypeScript, and Angular, as well as experience with Git, GitHub, Firebase, and Figma. Working with him is always pleasant, professional, and constructive.`,
      textDe: `Er arbeitet sehr strukturiert und effizient, wodurch Aufgaben schnell und fehlerfrei umgesetzt werden. Besonders beeindruckend ist seine Fähigkeit, sich rasch und sicher in bestehenden Code einzuarbeiten. Er verfügt über fundierte Kenntnisse in HTML, CSS, JavaScript, TypeScript und Angular sowie Erfahrung mit Git, GitHub, Firebase und Figma. Die Zusammenarbeit mit ihm ist stets angenehm, professionell und konstruktiv`,
      authorEn: 'Dominik Rapp - Team Partner',
      authorDe: 'Dominik Rapp - Teamkollege'
    },
    {
      textEn: 'Eugen stands out through his structured and goal-oriented approach. He quickly understands complex contexts and delivers high-quality results with great attention to detail. His strong technical expertise in modern web technologies and his proactive, collaborative mindset make him a valuable team member. Working with him is always efficient, insightful, and enjoyable.',
      textDe: 'Eugen überzeugt durch seine strukturierte und zielorientierte Arbeitsweise. Er erfasst komplexe Zusammenhänge schnell und liefert hochwertige Ergebnisse mit viel Sorgfalt und Detailgenauigkeit. Durch seine fundierte Fachkenntnis in modernen Webtechnologien und seine proaktive, teamorientierte Art ist er eine große Bereicherung für jedes Projekt. Die Zusammenarbeit mit ihm ist stets effizient, inspirierend und angenehm.',
      authorEn: 'Sven Degen - Team Partner',
      authorDe: 'Sven Degen - Teamkollege'
    }
  ];

  nextComment() {
    if (this.isAnimating || this.comments.length <= 1) return;
    this.isAnimating = true;
    const distance = this.commentWidth + this.gap;
    this.slideOffset = -distance;
    setTimeout(() => {
      this.disableTransition = true;
      this.activeCommentIndex = (this.activeCommentIndex + 1) % this.comments.length;
      this.slideOffset = 0;
      setTimeout(() => {
        this.disableTransition = false;
        this.isAnimating = false;
      }, 20);
    }, this.transitionDurationMs);
  }

  prevComment() {
    if (this.isAnimating || this.comments.length <= 1) return;
    this.isAnimating = true;
    const distance = this.commentWidth + this.gap;
    this.slideOffset = distance;
    setTimeout(() => {
      this.disableTransition = true;
      this.activeCommentIndex = (this.activeCommentIndex - 1 + this.comments.length) % this.comments.length;
      this.slideOffset = 0;
      setTimeout(() => {
        this.disableTransition = false;
        this.isAnimating = false;
      }, 20);
    }, this.transitionDurationMs);
  }

  getVisibleComments() {
    const len = this.comments.length;
    if (len === 0) return [];
    const prev = (this.activeCommentIndex - 1 + len) % len;
    const prevPrev = (this.activeCommentIndex - 2 + len) % len;
    const next = (this.activeCommentIndex + 1) % len;
    const nextNext = (this.activeCommentIndex + 2) % len;
    return [
      { data: this.comments[prevPrev], idx: prevPrev },
      { data: this.comments[prev], idx: prev },
      { data: this.comments[this.activeCommentIndex], idx: this.activeCommentIndex },
      { data: this.comments[next], idx: next },
      { data: this.comments[nextNext], idx: nextNext }
    ];
  }
}
