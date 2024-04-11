import {
  auditEnabled,
  DomainProps,
  domainsEnabled,
  extensionEnabled,
} from "@/utils/storage.ts";
import { urlMatches } from "@/utils/url.ts";

// send a message to the main world with the payload
const sendMessage = (payload: any) => {
  window.postMessage({
    type: `FOCUSLY_MESSAGE`,
    text: JSON.stringify({ payload }),
  });
};

const updateMainWorld = (
  enabled: boolean,
  domains: DomainProps[],
  audit?: boolean,
) => {
  // if the extension is enabled
  if (enabled) {
    // and the current domain is in the list of configured domains
    const match = urlMatches(domains);
    if (match.length > 0) {
      // send a message to the main world with the enabled state and the enabled toggles only
      const payload: any = {
        enabled,
        toggles: Object.fromEntries(
          Object.entries(match[0].toggles).filter(([, value]) => value),
        ),
      };
      if (audit !== undefined) payload["audit"] = audit;
      sendMessage(payload);
    }
  }
};

export default defineContentScript({
  matches: ["http://*/*","https://*/*"],
  allFrames: true,
  matchOriginAsFallback: true,
  runAt: "document_start",
  world: "ISOLATED",
  main() {
    // this is triggered when the page is loaded, if the extension is enabled already
    Promise.all([
      extensionEnabled.getValue(),
      domainsEnabled.getValue(),
      auditEnabled.getValue(),
    ]).then(([enabled, domains, audit]) =>
      updateMainWorld(enabled, domains, audit),
    );

    // this is triggered when the extension is enabled/disabled while on the page
    extensionEnabled.watch((enabled: boolean) => {
      domainsEnabled
        .getValue()
        .then((domains) => updateMainWorld(enabled, domains));
    });

    // this is triggered when the list of domains is changed while on the page,
    // if the extension is enabled already
    domainsEnabled.watch((domains: DomainProps[]) => {
      extensionEnabled
        .getValue()
        .then((enabled) => updateMainWorld(enabled, domains));
    });

    auditEnabled.watch((audit: boolean) => {
      sendMessage({ audit });
    });
  },
});
