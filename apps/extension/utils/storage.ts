export type DomainProps = {
  readonly domain: string;
  readonly toggles: DomainToggles;
};

export enum Toggle {
  ALL = "all",
  HIDDEN = "hidden",
  FOCUS = "focus",
  PAGE_HIDE = "pageHide",
  BLUR = "blur",
  VISIBILITY_STATE = "visibilityState",
  VISIBILITY_CHANGE = "visibilityChange",
  LOST_POINTER_CAPTURE = "lostPointerCapture",
  MOUSE_LEAVE = "mouseLeave",
}

export type DomainToggles = { [key in Toggle]: boolean };

export const DEFAULT_TOGGLES: DomainToggles = {
  all: false,
  hidden: false,
  focus: false,
  pageHide: false,
  blur: false,
  visibilityState: false,
  visibilityChange: false,
  lostPointerCapture: false,
  mouseLeave: false,
};

export const auditEnabled = storage.defineItem<boolean>(
  "local:focusly:auditEnabled",
  {
    defaultValue: false,
  },
);

export const extensionEnabled = storage.defineItem<boolean>(
  "local:focusly:extensionEnabled",
  {
    defaultValue: false,
  },
);

export const extensionPreviousEnabled = storage.defineItem<boolean>(
  "local:focusly:extensionPreviousEnabled",
  {
    defaultValue: false,
  },
);

export const domainsEnabled = storage.defineItem<DomainProps[]>(
  "local:focusly:domainsEnabled",
  {
    defaultValue: [],
  },
);

export const getCurrentDomainsProps = (
  toggles: Record<string, DomainToggles>,
) =>
  Object.entries(toggles).map(([domain, value]) => ({
    domain,
    toggles: value,
  }));
