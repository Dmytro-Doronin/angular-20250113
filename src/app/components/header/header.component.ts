import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    output,
    TemplateRef,
} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../../shared/services/popup/popup.service';
import {PopupHostComponent} from '../popup-host/popup-host.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, PopupHostComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly config = input.required<ApplicationConfig>();
    readonly popupService = inject(PopupService);

    readonly menuClick = output();

    openPopup(_template: TemplateRef<{$implicit: string}>) {
        const context = 'Hello!';

        this.popupService.openPopup(_template, context);
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
