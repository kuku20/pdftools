import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitComponent } from './split/split.component';
import { MergeSplitComponent } from './merge-split/merge-split.component';

const routes: Routes = [
  { path: 'split-pdf', component: SplitComponent },
  {path:'', redirectTo:'merge-pdf', pathMatch:'full'},
  {path:'merge-pdf', component: MergeSplitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
