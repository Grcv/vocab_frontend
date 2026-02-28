import { Component, OnInit, Input,OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../../services/user-progress';

interface Word {
  id: number;
  word: string;
  translation: string;
  [key: string]: any; // 👈 agrega esto
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

export class VocabularyList implements OnChanges  {
  @Input() type!: 'vocabulary' | 'verbs' | 'pronunciation' | 'phrasal_verbs' | 'grammar' | 'contractions' | 'connected_speech' | 'idioms' | 'listening';

  words: Word[] = [];
  filteredWords: Word[] = [];
  selectedWordIds = new Set<number>();

  filters: Record<string, string> = {};
  columns: string[] = [];
  // ✅ paginación configurable
  pageSizes = [10, 20, 50, 100];
  pageSize = 10;
  currentPage = 1;

  constructor(private progressService: ProgressService) {}


  ngOnChanges(): void {
    this.filters = {}
    console.log("type:",this.type)
    this.loadPendingWords();
  }

  initializeColumns(data: any[]) {
    if (!data?.length) return;

    this.columns = Object.keys(data[0]).filter(key => key !== 'id');
    console.log("columns:",this.columns)
  }

  loadPendingWords(): void {
    this.progressService.getPending(this.type).subscribe({
      next: (data: any) => {
        console.log("data.pending_words:",data.pending_words[0])
        Object.entries(data.pending_words[0]).forEach(([key]) => {
          this.filters[key] = '';
        });
        this.words = data.pending_words ?? [];
        this.selectedWordIds.clear();
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    this.filteredWords = this.words.filter(word => {

      return Object.keys(this.filters).every(key => {

        const filterValue = (this.filters[key] ?? '').toString().toLowerCase().trim();

        // Si el filtro está vacío, no filtra
        if (!filterValue) return true;

        const wordValue = (word[key] ?? '').toString().toLowerCase();

        return wordValue.includes(filterValue);
      });

    });
    this.initializeColumns(this.words);
    this.currentPage = 1;
  }

  resetFilters(): void {
    //this.filters = { word: '', translation: '', cefr: '', pos: '', category: '' };
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
