import { Component, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Component({
    selector: 'my-confirm-modal',
    templateUrl: 'confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss'],
})

export class ConfirmModalComponent extends ModalComponent {
    @Output() public confirm = new EventEmitter();

    public onConfirm() {
        this.close.emit();
        this.confirm.emit();
    }
}
