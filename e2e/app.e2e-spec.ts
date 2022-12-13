import { CourePage } from './app.po';

describe('coure App', () => {
  let page: CourePage;

  beforeEach(() => {
    page = new CourePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
