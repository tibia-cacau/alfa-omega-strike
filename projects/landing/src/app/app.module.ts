import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [CommonModule, AppRoutingModule],
  providers: [],
})
export class AppModule {}
