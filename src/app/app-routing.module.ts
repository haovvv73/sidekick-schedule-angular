import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { InfoComponent } from './pages/info/info.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';
import { AnalyzeDetailComponent } from './pages/analyze-detail/analyze-detail.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ScheduleDetailComponent } from './pages/schedule-detail/schedule-detail.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  { 
    path: '', 
    children:[ 
      { path:'', component:HomeComponent},
      { path:'schedule',component:ScheduleComponent},
      { path:'schedule/:_id', component:ScheduleDetailComponent },
      { path:'analyze', component:AnalyzeComponent },
      { path:'analyze/:_id', component:AnalyzeDetailComponent },
      { path:'contact', component:ContactComponent },
      { path:'events', component:EventsComponent },
      { path:'info',component:InfoComponent },
    ],
    component:MainTemplateComponent,
  },
  {
    path:'notfound',
    component:NotfoundComponent
  },
  {
    path:'**',
    redirectTo:'notfound'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
