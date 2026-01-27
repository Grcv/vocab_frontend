import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-finished-lesson',
  standalone: true,
  templateUrl: './finished-lesson.html',
  styleUrls: ['./finished-lesson.scss']
})
export class FinishedLesson {

  @Output() restart = new EventEmitter<void>();
  @Output() goToDashboard = new EventEmitter<void>();

}
