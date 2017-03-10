import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task-list/task-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'login', component: LoginComponent },
];

export const routing = RouterModule.forRoot(routes);
