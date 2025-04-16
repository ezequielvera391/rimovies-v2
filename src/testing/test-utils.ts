export function mockRouterWithState(state: any) {
  return {
    getCurrentNavigation: () => ({ extras: { state } }),
    navigate: jasmine.createSpy('navigate'),
  };
}
