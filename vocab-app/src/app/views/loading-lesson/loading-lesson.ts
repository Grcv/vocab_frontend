import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loading-lesson',
  imports: [CommonModule],
  templateUrl: './loading-lesson.html',
  styleUrl: './loading-lesson.scss',
})
export class LoadingLesson {
  @Input() message: string = 'Cargando lección...';
  @Input() visible: boolean = true;
}
