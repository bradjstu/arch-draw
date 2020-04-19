import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getMainComponents(): Promise<boolean> {
    return (
    element(by.css('app-root .top app-main-toolbar')).isPresent() &&
    element(by.css('app-root .centre app-canvas2d')).isPresent() &&
    element(by.css('app-root .bottom app-bottom-bar')).isPresent()
    ) as Promise<boolean>;
  }
}
