import { MyAngularAppPage } from './app.po';

describe('my-angular-app App', () => {
  let page: MyAngularAppPage;

  beforeEach(() => {
    page = new MyAngularAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
