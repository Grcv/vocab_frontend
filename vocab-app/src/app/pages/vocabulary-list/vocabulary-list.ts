import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../services/user-progress';

interface Word {
  id: number;
  word: string;
  translation: string;
  cefr: string;
  category: string;
  pos: string;
  ipa?: string;
  has_audio?: boolean;
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

export class VocabularyList implements OnInit {
  words: Word[] = [];
  filteredWords: Word[] = [];
  selectedWordIds = new Set<number>();

  filters = {
    word: '',
    translation: '',
    cefr: '',
    pos: '',
    category: ''
  };

  // ✅ paginación configurable
  pageSizes = [10, 20, 50, 100];
  pageSize = 10;
  currentPage = 1;

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.loadPendingWords();
  }

  loadPendingWords(): void {
    this.progressService.getPending().subscribe({
      next: (data: any) => {
        this.words = data.pending_words ?? [];
        this.selectedWordIds.clear();
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
  const f = {
    word: this.filters.word.toLowerCase(),
    translation: this.filters.translation.toLowerCase(),
    cefr: this.filters.cefr.toLowerCase(),
    pos: this.filters.pos.toLowerCase(),
    category: this.filters.category.toLowerCase()
  };

  this.filteredWords = this.words.filter(w => {
    const word = (w.word ?? '').toLowerCase();
    const translation = (w.translation ?? '').toLowerCase();
    const cefr = (w.cefr ?? '').toLowerCase();
    const pos = (w.pos ?? '').toLowerCase();
    const category = (w.category ?? '').toLowerCase();

    return (
      word.includes(f.word) &&
      translation.includes(f.translation) &&
      cefr.includes(f.cefr) &&
      pos.includes(f.pos) &&
      category.includes(f.category)
    );
  });

  this.currentPage = 1;
}

  resetFilters(): void {
    this.filters = { word: '', translation: '', cefr: '', pos: '', category: '' };
    this.applyFilters();
  }

  changePageSize(): void {
    this.currentPage = 1;
  }

  get paginatedWords(): Word[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredWords.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredWords.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  toggleWord(wordId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    checked
      ? this.selectedWordIds.add(wordId)
      : this.selectedWordIds.delete(wordId);
  }

  saveProgress(): void {
    const ids = [...this.selectedWordIds];
    if (!ids.length) return;

    this.progressService.submitMark(ids).subscribe({
      next: () => this.loadPendingWords()
    });
  }
}
