import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import {PopupService} from '../../shared/services/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly popupService = inject(PopupService);

    readonly viewportViewContainer = viewChild.required('viewport', {
        read: ViewContainerRef,
    });

    constructor() {
        this.listenUpdatePopupContent();
    }

    get isPopupOpen() {
        return !!this.popupService.template$();
    }

    closePopup() {
        this.popupService.closePopup();
    }

    private listenUpdatePopupContent() {
        effect(() => {
            const template = this.popupService.template$();
            const context = this.popupService.context$();

            this.viewportViewContainer().clear();

            if (template) {
                this.viewportViewContainer().clear();
                this.viewportViewContainer().createEmbeddedView(template, {$implicit: context});
            }
        });
    }
}
