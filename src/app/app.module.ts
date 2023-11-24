import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdsenseModule } from 'ng2-adsense';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MergeSplitComponent } from './merge-split/merge-split.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SplitComponent } from './split/split.component';
@NgModule({
  declarations: [AppComponent, MergeSplitComponent, SplitComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7470471186753851',
      adSlot: 7408304468,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
