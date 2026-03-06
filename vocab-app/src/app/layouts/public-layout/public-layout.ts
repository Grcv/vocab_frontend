import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Logo } from '../../shared/logo/logo'

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    RouterModule,
    Logo
],
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.scss']
})
export class PublicLayout {}
