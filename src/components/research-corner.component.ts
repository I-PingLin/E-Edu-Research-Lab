
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-research-corner',
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h2 class="text-3xl font-bold text-slate-800">リサーチ・コーナー</h2>
          <p class="text-slate-500">教育心理学・発達科学の最新トレンドを短くまとめました。</p>
        </div>
        <button 
          (click)="fetchSnippet()" 
          [disabled]="loading()"
          class="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-600 disabled:opacity-50">
          <i class="fas fa-sync-alt" [class.animate-spin]="loading()"></i>
        </button>
      </div>

      @if (loading() && !snippet()) {
        <div class="flex flex-col items-center justify-center py-20 space-y-4">
          <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p class="text-slate-400 font-medium">学術データベースから抽出中...</p>
        </div>
      }

      @if (snippet()) {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div class="mb-4 inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest">
              Topic: {{ snippet().topic }}
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-4 leading-snug">研究の概要</h3>
            <p class="text-slate-600 leading-relaxed mb-6">
              {{ snippet().summary }}
            </p>
            <div class="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 border-l-4 border-l-indigo-500">
              <h4 class="text-indigo-900 font-bold mb-1">Key Takeaway</h4>
              <p class="text-indigo-800">{{ snippet().key_takeaway }}</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <h3 class="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <i class="fas fa-chart-bar"></i>
                現場での実践ヒント
              </h3>
              <ul class="space-y-4 text-emerald-800/80">
                <li class="flex gap-3">
                  <i class="fas fa-arrow-right mt-1 text-emerald-500"></i>
                  <span>この研究によると、<strong>具体的なフィードバック</strong>が自己効力感を高める重要な要因です。</span>
                </li>
                <li class="flex gap-3">
                  <i class="fas fa-arrow-right mt-1 text-emerald-500"></i>
                  <span>毎日の<strong>振り返りの時間</strong>を5分設けるだけで、定着率が20%向上する可能性があります。</span>
                </li>
              </ul>
            </div>

            <div class="bg-slate-800 rounded-3xl p-8 text-white">
              <h3 class="text-xl font-bold mb-4">研究ソース種別</h3>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                  <i class="fas" [class.fa-book]="snippet().source_type === 'Academic'" [class.fa-globe]="snippet().source_type !== 'Academic'"></i>
                </div>
                <div>
                  <div class="text-slate-400 text-xs font-bold uppercase tracking-widest">Database Source</div>
                  <div class="text-lg font-semibold">{{ snippet().source_type }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Decorative section -->
      <div class="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
        <i class="fas fa-flask text-4xl text-slate-300 mb-4"></i>
        <h4 class="text-slate-400 font-bold">研究は継続中です。</h4>
        <p class="text-slate-400 text-sm">毎秒、新しいデータがこのプラットフォームをより賢くしています。</p>
      </div>
    </div>
  `,
  styles: []
})
export class ResearchCornerComponent implements OnInit {
  private gemini = inject(GeminiService);
  loading = signal(false);
  snippet = signal<any>(null);

  ngOnInit() {
    this.fetchSnippet();
  }

  async fetchSnippet() {
    this.loading.set(true);
    try {
      const result = await this.gemini.getResearchSnippet();
      this.snippet.set(result);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
