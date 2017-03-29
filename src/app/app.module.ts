import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ApiService } from './shared';
import { routing } from './app.routing';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { PagerService } from './shared/services/pager.service';
import { WeekService } from './shared/services/week.service';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SimpleDayComponent } from './calendar/simple-day/simple-day.component';
import { WorkdayComponent } from './calendar/workday/workday.component';
import { MonthlyStatisticComponent } from './calendar/monthly-statistic/monthly-statistic.component';
import { DailyStatisticComponent } from './task-list/daily-statistic/daily-statistic.component';
import { PagerComponent } from './calendar/pager/pager.component';
import { LoginComponent } from './login/login.component';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { RegisterComponent } from './register/register.component';
import { ModifyTaskComponent } from './task-list/task-table/modify-task/modify-task.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { TaskTableComponent } from './task-list/task-table/task-table.component';
import { NetworkService } from './shared/services/network.service';
import { AuthGuard } from './shared/auth.guard.';
import { LoginService } from './shared/services/login.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/translations/', '.json'),
      deps: [Http]
    })
  ],
  declarations: [
    AppComponent,

    NavigationComponent,

    ErrorModalComponent,
    ConfirmModalComponent,

    TaskListComponent,
    TaskTableComponent,
    DailyStatisticComponent,
    ModifyTaskComponent,

    CalendarComponent,
    MonthlyStatisticComponent,
    PagerComponent,
    SimpleDayComponent,
    WorkdayComponent,

    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    ApiService,
    WeekService,
    PagerService,
    NetworkService,
    AuthGuard,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}

  public hmrOnInit(store): void {
    console.log('HMR store', store);
  }

  public hmrOnDestroy(store): void {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store): void {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
