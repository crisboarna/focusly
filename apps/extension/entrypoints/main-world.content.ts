let originalVisibilityStateDescriptor: PropertyDescriptor | undefined;
let originalWebkitVisibilityStateDescriptor: PropertyDescriptor | undefined;
let originalHiddenDescriptor: PropertyDescriptor | undefined;
let originalWebkitHiddenDescriptor: PropertyDescriptor | undefined;

let extensionMessagePayload = {
  enabled: false,
  audit: false,
  toggles: {
    hidden: false,
    focus: false,
    pageHide: false,
    blur: false,
    visibilityState: false,
    visibilityChange: false,
    lostPointerCapture: false,
    mouseLeave: false,
  },
};

const audit = (type: string) => {
  if (extensionMessagePayload.audit) {
    console.log(`[Focusly]: ${type}`);
  }
};

const blockEvent = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
};

const injectVisibilityState = () => {
  Object.defineProperty(document, "visibilityState", {
    get() {
      if (
        extensionMessagePayload.enabled &&
        extensionMessagePayload.toggles.visibilityState
      ) {
        audit("visibilityState");
        return "visible";
      }
      return originalVisibilityStateDescriptor?.get?.call(document);
    },
  });
  Object.defineProperty(document, "webkitVisibilityState", {
    get() {
      if (
        extensionMessagePayload.enabled &&
        extensionMessagePayload.toggles.visibilityState
      ) {
        audit("webkitVisibilityState");
        return "visible";
      }
      return originalWebkitVisibilityStateDescriptor?.get?.call(document);
    },
  });
};

const injectHidden = () => {
  Object.defineProperty(document, "hidden", {
    get() {
      if (
        extensionMessagePayload.enabled &&
        extensionMessagePayload.toggles.hidden
      ) {
        audit("hidden");
        return false;
      }
      return originalHiddenDescriptor?.get?.call(document);
    },
  });
  Object.defineProperty(document, "webkitHidden", {
    get() {
      if (
        extensionMessagePayload.enabled &&
        extensionMessagePayload.toggles.hidden
      ) {
        audit("webkitHidden");
        return false;
      }
      return originalWebkitHiddenDescriptor?.get?.call(document);
    },
  });
};

const injectVisibilityChange = () => {
  const visibilityChangeHandler = (e: Event) => {
    if (
      extensionMessagePayload.enabled &&
      extensionMessagePayload.toggles.visibilityChange
    ) {
      audit("visibilityChange");
      return blockEvent(e);
    }
    return undefined;
  };
  document.addEventListener("visibilitychange", visibilityChangeHandler, true);
  document.addEventListener(
    "webkitvisibilitychange",
    visibilityChangeHandler,
    true,
  );
};

const injectPageHide = () => {
  const pageHideChangeHandler = (e: Event) => {
    if (
      extensionMessagePayload.enabled &&
      extensionMessagePayload.toggles.pageHide
    ) {
      audit("pagehide");
      return blockEvent(e);
    }
    return undefined;
  };
  document.addEventListener("pagehide", pageHideChangeHandler, true);
  window.addEventListener("pagehide", pageHideChangeHandler, true);
};

const injectLostPointCapture = () => {
  const lostPointCaptureChangeHandler = (e: Event) => {
    if (
      extensionMessagePayload.enabled &&
      extensionMessagePayload.toggles.lostPointerCapture
    ) {
      audit("lostpointercapture");
      return blockEvent(e);
    }
    return undefined;
  };
  document.addEventListener(
    "lostpointercapture",
    lostPointCaptureChangeHandler,
    true,
  );
  window.addEventListener(
    "lostpointercapture",
    lostPointCaptureChangeHandler,
    true,
  );
};

const injectFocus = () => {
  // hasFocus is a method so we can use the Proxy apply trap
  Document.prototype.hasFocus = new Proxy(Document.prototype.hasFocus, {
    apply(target, self, args) {
      return extensionMessagePayload.enabled &&
        extensionMessagePayload.toggles.focus
        ? true
        : Reflect.apply(target, self, args);
    },
  });

  const focusChangeHandler = (e: Event) => {
    if (
      extensionMessagePayload.enabled &&
      extensionMessagePayload.toggles.focus
    ) {
      audit("focus");
      return blockEvent(e);
    }
    return undefined;
  };
  document.addEventListener("focus", focusChangeHandler, true);
  window.addEventListener("focus", focusChangeHandler, true);
};

const injectBlur = () => {
  const blurChangeHandler = (e: Event) => {
    if (
      extensionMessagePayload.enabled &&
      extensionMessagePayload.toggles.blur
    ) {
      audit("blur");
      return blockEvent(e);
    }
    return undefined;
  };
  document.addEventListener("blur", blurChangeHandler, true);
  window.addEventListener("blur", blurChangeHandler, true);
};

const injectMouseLeave = () => {
  const mouseLeaveChangeHandler = (e: Event) => {
    if (
      extensionMessagePayload.enabled &&
      extensionMessagePayload.toggles.mouseLeave
    ) {
      audit("mouseleave");
      return blockEvent(e);
    }
    return undefined;
  };
  document.addEventListener("mouseleave", mouseLeaveChangeHandler, true);
  window.addEventListener("mouseleave", mouseLeaveChangeHandler, true);
};

const injectExtensionMessageListener = () => {
  window.addEventListener("message", (e) => {
    switch (e.data.type) {
      case "FOCUSLY_MESSAGE":
        // eslint-disable-next-line no-case-declarations
        const { payload } = JSON.parse(e.data.text);
        extensionMessagePayload = { ...extensionMessagePayload, ...payload };
        break;
    }
  });
};

const saveOriginalProperties = () => {
  originalVisibilityStateDescriptor = Object.getOwnPropertyDescriptor(
    document,
    "visibilityState",
  );
  originalWebkitVisibilityStateDescriptor = Object.getOwnPropertyDescriptor(
    document,
    "webkitVisibilityState",
  );
  originalHiddenDescriptor = Object.getOwnPropertyDescriptor(
    document,
    "hidden",
  );
  originalWebkitHiddenDescriptor = Object.getOwnPropertyDescriptor(
    document,
    "webkitHidden",
  );
};

export default defineContentScript({
  matches: ["http://*/*","https://*/*"],
  allFrames: true,
  matchOriginAsFallback: true,
  runAt: "document_start",
  world: "MAIN",
  main() {
    saveOriginalProperties();
    injectFocus();
    injectBlur();
    injectHidden();
    injectPageHide();
    injectMouseLeave();
    injectVisibilityState();
    injectVisibilityChange();
    injectLostPointCapture();
    injectExtensionMessageListener();
  },
});
