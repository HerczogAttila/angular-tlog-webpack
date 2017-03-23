import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'my-modal',
    template: ``,
})

export class ModalComponent {
    @Input() public isVisible: boolean;
    @Input() public message: string;
    @Output() public close = new EventEmitter();

    public onClose(): void {
        this.close.emit();
    }
}
