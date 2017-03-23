import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'my-error-modal',
    templateUrl: 'error-modal.component.html',
    styleUrls: ['error-modal.component.scss'],
})

export class ErrorModalComponent {
    @Input() public isError: boolean;
    @Input() public message = 'Unknown error';
    @Output() public closeError = new EventEmitter();

    public onCloseError(): void {
        this.closeError.emit(this);
    }
}
