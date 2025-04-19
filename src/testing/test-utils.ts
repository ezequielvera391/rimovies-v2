export function mockRouterWithState(state: any) {
  return {
    getCurrentNavigation: () => ({ extras: { state } }),
    navigate: jasmine.createSpy('navigate'),
  };
}

export function mockActivatedRouteWithParams(params: Record<string, any>) {
  return {
    snapshot: { params },
  };
}
