import { Component } from '@angular/core';

import { ExerciseSettings } from '../exercise-settings/exercise-settings';

type TabType = 'vocabulary' | 'verbs' | 'pronunciation' | 'phrasal_verbs' | 'grammar' | 'contractions' | 'connected_speech' | 'idioms' | 'listening';

@Component({
  selector: 'app-tab-exercise',
  standalone: true,
  imports: [ExerciseSettings],
  templateUrl: './tab-exercise.html',
  styleUrl: './tab-exercise.scss',
})
export class TabExercise {

  tabs: { label: string; value: TabType }[] = [
    { label: 'Vocabulario', value: 'vocabulary' },
    { label: 'Verbos', value: 'verbs' },
    { label: 'Pronunciacion', value: 'pronunciation' },
    { label: 'Verbos Frasales', value: 'phrasal_verbs' },
    { label: 'Gramatica', value: 'grammar' },
    { label: 'Contracciones', value: 'contractions' },
    { label: 'Connected Speech', value: 'connected_speech' },
    { label: 'Idioms', value: 'idioms' },
    { label: 'Listening', value: 'listening' },
  ];

  activeTab: TabType = this.tabs[0].value;

  setTab(tab: TabType) {
    console.log(tab)
    this.activeTab = tab;
  }


}
