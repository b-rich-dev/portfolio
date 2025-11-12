import { Routes } from '@angular/router';
import { LegalNotice } from './legal-notice/legal-notice';
import { Main } from './main/main';
import { LandscapeModus } from './shared/landscape-modus/landscape-modus';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'legal-notice', component: LegalNotice },
    { path: 'landscape', component: LandscapeModus },
    { path: 'privacy-policy', component: PrivacyPolicy }
];
