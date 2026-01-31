
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { ActivityGeneratorComponent } from './components/activity-generator.component';
import { ResearchCornerComponent } from './components/research-corner.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DashboardComponent, ActivityGeneratorComponent, ResearchCornerComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  currentTab = signal<'dashboard' | 'activities' | 'research'>('dashboard');

  setTab(tab: 'dashboard' | 'activities' | 'research') {
    this.currentTab.set(tab);
  }
}
