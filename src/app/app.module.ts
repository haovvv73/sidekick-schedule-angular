import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { EventsComponent } from './pages/events/events.component';
import { InfoComponent } from './pages/info/info.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewTableComponent } from './components/view-table/view-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingUIComponent } from './components/setting-ui/setting-ui.component';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { WindowLayoutComponent } from './components/window-layout/window-layout.component';
import { LoginComponent } from './pages/login/login.component'
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowNoTabLayoutComponent } from './components/window-no-tab-layout/window-no-tab-layout.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DynamicViewTableComponent } from './components/dynamic-view-table/dynamic-view-table.component';
import {MatTableModule} from '@angular/material/table';
import { DialogOneFieldComponent } from './components/dialog-one-field/dialog-one-field.component';
import { AnalyzeDetailComponent } from './pages/analyze-detail/analyze-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsComponent,
    GroupsComponent,
    EventsComponent,
    InfoComponent,
    NotfoundComponent,
    HeaderComponent,
    ViewTableComponent,
    TaskbarComponent,
    SettingUIComponent,
    MainTemplateComponent,
    WindowLayoutComponent,
    LoginComponent,
    RegisterComponent,
    WindowNoTabLayoutComponent,
    AnalyzeComponent,
    DynamicViewTableComponent,
    DialogOneFieldComponent,
    AnalyzeDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    CdkDrag,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
