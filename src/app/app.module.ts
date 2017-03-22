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
import { SimpleDayComponent } from './calendar/week/simple-day/simple-day.component';
import { WorkdayComponent } from './calendar/week/workday/workday.component';
import { WeekComponent } from './calendar/week/week.component';
import { MonthlyStatisticComponent } from './calendar/monthly-statistic/monthly-statistic.component';
import { DailyStatisticComponent } from './task-list/daily-statistic/daily-statistic.component';
import { PagerComponent } from './calendar/pager/pager.component';
import { LoginComponent } from './login/login.component';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { RegisterComponent } from './register/register.component';
import { ModifyTaskComponent } from './task-list/modify-task/modify-task.component';
import { NavigationComponent } from './navigation/navigation.component';

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

    TaskListComponent,
    DailyStatisticComponent,
    ModifyTaskComponent,

    CalendarComponent,
    MonthlyStatisticComponent,
    PagerComponent,
    WeekComponent,
    SimpleDayComponent,
    WorkdayComponent,

    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    ApiService,
    WeekService,
    PagerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
