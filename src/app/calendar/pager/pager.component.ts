import { PagerService } from '../../shared/services/pager.service';
import { Component } from '@angular/core';

@Component({
    selector: 'my-pager',
    templateUrl: 'pager.component.html',
})

export class PagerComponent {
    constructor(public pagerService: PagerService) {}

    public onPreviousMonth(): void {
        this.pagerService.previousMonth();
    }

    public onNextMonth(): void {
        this.pagerService.nextMonth();
    }
}
