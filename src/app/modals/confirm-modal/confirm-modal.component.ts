import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'my-confirm-modal',
    templateUrl: 'confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss'],
})

export class ConfirmModalComponent {
    @Input() public isVisible: boolean;
    @Input() public message: string;
    @Output() public close = new EventEmitter();
    @Output() public confirm = new EventEmitter();

    public onClose(): void {
        this.close.emit();
    }

    public onConfirm() {
        this.close.emit();
        this.confirm.emit();
    }
}
