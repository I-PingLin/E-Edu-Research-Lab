
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-activity-generator',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-slate-800 mb-2">AI教育活動ジェネレーター</h2>
        <p class="text-slate-500">子どもの年齢と興味に合わせて、オーダーメイドの学習プランを提案します。</p>
      </div>

      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">対象年齢</label>
            <select [(ngModel)]="age" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option value="3">3歳</option>
              <option value="4">4歳</option>
              <option value="5">5歳</option>
              <option value="6">小学1年生 (6歳)</option>
              <option value="7">小学2年生 (7歳)</option>
              <option value="8">小学3年生 (8歳)</option>
              <option value="9">小学4年生以上</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">学習テーマ・興味</label>
            <input type="text" [(ngModel)]="theme" placeholder="例：宇宙、料理、算数、自然..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
          </div>
        </div>

        <button 
          (click)="generate()" 
          [disabled]="loading()"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2">
          @if (loading()) {
            <i class="fas fa-circle-notch animate-spin"></i>
            研究データを分析中...
          } @else {
            <i class="fas fa-magic"></i>
            教育プランを生成する
          }
        </button>
      </div>

      @if (activity()) {
        <div class="bg-white rounded-3xl p-8 shadow-lg border-l-8 border-indigo-600 animate-in fade-in duration-700">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-bold text-slate-800">{{ activity().title }}</h3>
            <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">AI Generated</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-2 space-y-6">
              <section>
                <h4 class="flex items-center gap-2 font-bold text-slate-700 mb-2">
                  <i class="fas fa-bullseye text-indigo-500"></i>
                  学習のねらい
                </h4>
                <p class="text-slate-600 leading-relaxed">{{ activity().objective }}</p>
              </section>

              <section>
                <h4 class="flex items-center gap-2 font-bold text-slate-700 mb-2">
                  <i class="fas fa-list-ol text-indigo-500"></i>
                  活動のステップ
                </h4>
                <ol class="space-y-3">
                  @for (step of activity().steps; track $index) {
                    <li class="flex gap-3 text-slate-600">
                      <span class="flex-shrink-0 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold">{{ $index + 1 }}</span>
                      <span>{{ step }}</span>
                    </li>
                  }
                </ol>
              </section>
            </div>

            <div class="space-y-6">
              <div class="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 class="font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <i class="fas fa-tools text-indigo-500 text-sm"></i>
                  必要なもの
                </h4>
                <ul class="space-y-2 text-sm text-slate-600">
                  @for (item of activity().materials; track $index) {
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check text-green-500 text-xs"></i>
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>

              <div class="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <h4 class="font-bold text-amber-800 mb-2 flex items-center gap-2 text-sm">
                  <i class="fas fa-lightbulb text-amber-500"></i>
                  保護者への助言
                </h4>
                <p class="text-sm text-amber-900/80 leading-relaxed italic">
                  "{{ activity().advice }}"
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ActivityGeneratorComponent {
  private gemini = inject(GeminiService);
  
  age = '5';
  theme = '';
  loading = signal(false);
  activity = signal<any>(null);

  async generate() {
    if (!this.theme) return alert('テーマを入力してください');
    
    this.loading.set(true);
    try {
      const result = await this.gemini.generateActivity(this.age, this.theme);
      this.activity.set(result);
    } catch (err) {
      console.error(err);
      alert('エラーが発生しました。もう一度お試しください。');
    } finally {
      this.loading.set(false);
    }
  }
}
