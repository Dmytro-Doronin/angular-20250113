import {Injectable, signal, TemplateRef} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly template$ = signal<TemplateRef<unknown> | null>(null);
    readonly context$ = signal<unknown | null>(null);

    openPopup(template: TemplateRef<unknown>, context: unknown | null = null) {
        this.template$.set(template);
        this.context$.set(context);
    }

    closePopup() {
        this.template$.set(null);
        this.context$.set(null);
    }
}
