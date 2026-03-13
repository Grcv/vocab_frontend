import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../services/user-progress';

interface Word {
  id: number;
  status?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './vocabulary-list.html',
  styleUrls: ['./vocabulary-list.scss']
})
export class VocabularyList implements OnChanges {

  @Input() type!: 
    'vocabulary' |
    'verbs' |
    'pronunciation' |
    'phrasal_verbs' |
    'grammar' |
    'contractions' |
    'connected_speech' |
    'idioms' |
    'listening';

  words: Word[] = [];
  filteredWords: Word[] = [];

  selectedWordIds = new Set<number>();

  filters: Record<string, string> = {};

  columns: string[] = [];

  pageSizes = [10, 20, 50, 100];
  pageSize = 10;

  currentPage = 1;

  constructor(private progressService: ProgressService) {}

  ngOnChanges(): void {
    this.filters = {};
    this.loadPendingWords();
  }

  initializeColumns(data: any[]) {

    if (!data?.length) return;

    this.columns = Object.keys(data[0]).filter(
      key => key !== 'id' && key !== 'status'
    );

  }

  loadPendingWords(): void {

    this.progressService.getPending(this.type).subscribe({

      next: (data: any) => {

        this.words = data.pending_words ?? [];

        this.initializeColumns(this.words);

        this.filters = {};
        this.columns.forEach(col => this.filters[col] = '');

        // limpiar selección
        this.selectedWordIds.clear();

        // marcar checkboxes si status = true
        this.words.forEach(word => {
          if (word.status === true) {
            this.selectedWordIds.add(word.id);
          }
        });

        this.applyFilters();

      }

    });

  }

  applyFilters(): void {

    this.filteredWords = this.words.filter(word => {

      return Object.keys(this.filters).every(key => {

        const filterValue =
          (this.filters[key] ?? '').toString().toLowerCase().trim();

        if (!filterValue) return true;

        const wordValue =
          (word[key] ?? '').toString().toLowerCase();

        return wordValue.includes(filterValue);

      });

    });

    this.currentPage = 1;

  }

  resetFilters(): void {

    Object.keys(this.filters).forEach(key => {
      this.filters[key] = '';
    });

    this.applyFilters();

  }

  changePageSize(): void {
    this.currentPage = 1;
  }

  get paginatedWords(): Word[] {

    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredWords.slice(
      start,
      start + this.pageSize
    );

  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredWords.length / this.pageSize
    );

  }

  nextPage(): void {

    if (this.currentPage < this.totalPages)
      this.currentPage++;

  }

  prevPage(): void {

    if (this.currentPage > 1)
      this.currentPage--;

  }

  toggleWord(wordId: number, event: Event): void {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked)
      this.selectedWordIds.add(wordId);
    else
      this.selectedWordIds.delete(wordId);

  }

  saveProgress(): void {

    const ids = [...this.selectedWordIds];

    if (!ids.length) return;

    this.progressService.submitMark(ids).subscribe({

      next: () => this.loadPendingWords()

    });

  }

}