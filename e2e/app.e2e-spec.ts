import { HobbitPage } from './app.po';

describe('hobbit App', () => {
  let page: HobbitPage;

  beforeEach(() => {
    page = new HobbitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
