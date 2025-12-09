import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { SessionInputComponent } from './components/session-input/session-input.component';
import { SessionSummaryComponent } from './components/session-summary/session-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionInputComponent,
    HistoryListComponent,
    SessionSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
