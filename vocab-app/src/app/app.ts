import { Component, HostListener } from '@angular/core';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';
import { AuthService } from './services/auth';
import { AudioService } from './services/audio';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PublicLayout,
    PrivateLayout
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

  isAuthenticated = false;

  constructor(private authService: AuthService,private audioService:AudioService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      auth => this.isAuthenticated = auth
    );
  }

  @HostListener('click')
  unlock() {
    this.audioService.unlockAudio();
  }

}
