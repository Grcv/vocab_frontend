import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-loading-lesson',
  imports: [],
  templateUrl: './loading-lesson.html',
  styleUrl: './loading-lesson.scss',
})
export class LoadingLesson {
  @Input() message: string = 'Cargando lección...';
  @Input() visible: boolean = true;
}
