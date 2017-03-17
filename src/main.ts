import { enableProdMode, LOCALE_ID, TRANSLATIONS_FORMAT, TRANSLATIONS } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { TRANSLATION_EN } from './locale/messages';
import { TRANSLATION_HU } from './locale/messages.hu';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
}

const locale = navigator.language;
const translations = locale === 'hu' ? TRANSLATION_HU : TRANSLATION_EN;

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule,
      {
        providers: [
          { provide: TRANSLATIONS, useValue: translations },
          { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
          { provide: LOCALE_ID, useValue: locale }
        ]
      });
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
