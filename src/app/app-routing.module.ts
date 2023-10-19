import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { EventsComponent } from './pages/events/events.component';
import { InfoComponent } from './pages/info/info.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';

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
      { path:'lessons',component:LessonsComponent},
      { path:'analyze', component:AnalyzeComponent },
      { path:'groups', component:GroupsComponent },
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
