
import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">
      <!-- Hero -->
      <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold mb-4">教育の可能性を、毎秒更新する。</h2>
          <p class="text-indigo-100 mb-6 text-lg">
            EduLabは最新の教育工学とAIを融合させ、個々の子どもに最適な学びのカタチを研究・提案します。
          </p>
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/20">
              <div class="text-xs text-indigo-200 uppercase tracking-wider font-bold mb-1">研究データ</div>
              <div class="text-2xl font-bold">{{ dataPoints() }}</div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/20">
              <div class="text-xs text-indigo-200 uppercase tracking-wider font-bold mb-1">本日の提案数</div>
              <div class="text-2xl font-bold">1,248</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-brain text-xl"></i>
          </div>
          <h3 class="font-bold text-slate-800 mb-2">認知発達</h3>
          <p class="text-sm text-slate-500">遊びを通じたメタ認知スキルの向上に関する最新データが集約されています。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-users text-xl"></i>
          </div>
          <h3 class="font-bold text-slate-800 mb-2">社会情緒的学習</h3>
          <p class="text-sm text-slate-500">非認知能力の育成が将来の学力に与える影響についての相関分析を実施中。</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-microscope text-xl"></i>
          </div>
          <h3 class="font-bold text-slate-800 mb-2">神経科学</h3>
          <p class="text-sm text-slate-500">脳科学に基づく最適な学習時間と環境設定のガイドラインを生成します。</p>
        </div>
      </div>

      <!-- Live Research Feed -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-bold text-slate-800 flex items-center gap-2">
            <i class="fas fa-bolt text-yellow-500"></i>
            ライブ・リサーチ・フィード
          </h3>
          <span class="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">毎秒更新中</span>
        </div>
        <div class="divide-y divide-slate-50">
          @for (feed of feedItems(); track feed.id) {
            <div class="p-4 flex gap-4 hover:bg-slate-50 transition-colors">
              <div class="text-xs font-mono text-slate-400 pt-1">{{ feed.time }}</div>
              <div>
                <div class="text-sm font-semibold text-slate-700">{{ feed.topic }}</div>
                <div class="text-xs text-slate-500">{{ feed.content }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  dataPoints = signal(458021);
  feedItems = signal([
    { id: 1, time: '12:05:01', topic: 'STEAM教育', content: 'プログラミング的思考の導入年齢に関する新しい論文が発表されました。' },
    { id: 2, time: '12:04:59', topic: '読解力向上', content: '低学年における音読の効果についてのメタ分析データが更新されました。' },
    { id: 3, time: '12:04:45', topic: '集中力持続', content: '90分授業と45分授業の学習定着率の比較研究が進んでいます。' }
  ]);
  private interval: any;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.dataPoints.update(v => v + Math.floor(Math.random() * 5));
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      const topics = ['モンテッソーリ', 'レッジョ・エミリア', '自由保育', 'ICT活用', '主体的な学び'];
      const contents = ['最新の統計が反映されました。', 'AIによる解析結果が出ました。', '教育現場からのFBがありました。', '研究成果の要約が完成しました。'];
      
      const newItem = {
        id: Date.now(),
        time: timeStr,
        topic: topics[Math.floor(Math.random() * topics.length)],
        content: contents[Math.floor(Math.random() * contents.length)]
      };

      this.feedItems.update(current => [newItem, ...current.slice(0, 4)]);
    }, 2000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}
