import { browser } from "wxt/browser";
import focuslyLogoEnabled from "@/assets/focusly.png";
import focuslyLogoDisabled from "@/assets/focusly-disabled.png";
import iconSettings from "@/assets/settings.svg";
import iconToggleOff from "@/assets/toggle-off.png";
import iconToggleOn from "@/assets/toggle-on.png";
import Popup from "@/ui/pages/popup/popup.container.tsx";
import { useExtensionEnabled } from "@/utils/hooks/useExtensionEnabled.tsx";
import { useDomainsEnabled } from "@/utils/hooks/useDomainsEnabled.tsx";
import { useCurrentTab } from "@/utils/hooks/useCurrentTab.tsx";
import { getUrlVariations } from "@/utils/url.ts";
import "./App.css";

function App() {
  const [tab] = useCurrentTab();
  const [extensionEnabled, setExtensionEnabled] = useExtensionEnabled();
  const [domains, setDomains] = useDomainsEnabled();

  return (
    <>
      <div>
        <a href="https://crisboarna.github.io/focusly" target="_blank">
          <img
            src={extensionEnabled ? focuslyLogoEnabled : focuslyLogoDisabled}
            className="logo"
            alt="Focusly logo"
          />
        </a>
        <p>
          <img
            data-testid={"toggle-extension-src"}
            src={extensionEnabled ? iconToggleOn : iconToggleOff}
            className="power-icon"
            alt="Focusly Enable/Disable"
            onClick={() => setExtensionEnabled(!extensionEnabled)}
          />
        </p>
        <p>
          <img
            src={iconSettings}
            className="settings-icon rotate-on-hover"
            alt="Focusly Settings"
            onClick={() => browser.runtime.openOptionsPage()}
          />
        </p>
      </div>
      <h1>Focusly</h1>
      {tab && (
        <Popup
          currentDomains={getUrlVariations(tab.url)}
          configuredDomains={domains}
          setDomains={setDomains}
        />
      )}
    </>
  );
}

export default App;
