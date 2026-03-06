import { Component } from '@angular/core';

import { Progress } from '../progress/progress';

type TabType = 'vocabulary' | 'verbs' | 'pronunciation' | 'phrasal_verbs' | 'grammar' | 'contractions' | 'connected_speech' | 'idioms' | 'listening';

@Component({
  selector: 'app-tab-progress',
  standalone: true,
  imports: [Progress],
  templateUrl: './tab-progress.html',
  styleUrl: './tab-progress.scss',
})
export class TabProgress {

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
