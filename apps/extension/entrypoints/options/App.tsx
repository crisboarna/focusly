import focuslyLogoEnabled from "@/assets/focusly.png";
import focuslyLogoDisabled from "@/assets/focusly-disabled.png";
import iconToggleOn from "@/assets/toggle-on.png";
import iconToggleOff from "@/assets/toggle-off.png";
import { useAuditEnabled } from "@/utils/hooks/useAuditEnabled.tsx";
import { useExtensionEnabled } from "@/utils/hooks/useExtensionEnabled.tsx";
import { useDomainsEnabled } from "@/utils/hooks/useDomainsEnabled.tsx";
import Options from "@/ui/pages/options/options.container.tsx";
import "./App.css";

function App() {
  const [auditEnabled, setAuditEnabled] = useAuditEnabled();
  const [extensionEnabled, setExtensionEnabled] = useExtensionEnabled();
  const [domains, setDomains] = useDomainsEnabled();

  return (
    <>
      <div className={"toggle-container"}>
        <div className={"toggle"} data-testid={"toggle-extension"}>
          <span>On/Off</span>
          <img
            data-testid={"toggle-extension-src"}
            src={extensionEnabled ? iconToggleOn : iconToggleOff}
            className="power-icon"
            alt="Focusly Enable/Disable"
            onClick={() => setExtensionEnabled(!extensionEnabled)}
          />
        </div>
        <div className={"toggle"} data-testid={"toggle-audit"}>
          <span>Audit Console On/Off</span>
          <img
            data-testid={"toggle-audit-src"}
            src={auditEnabled ? iconToggleOn : iconToggleOff}
            className="power-icon"
            alt="Audit Enable/Disable"
            onClick={() => setAuditEnabled(!auditEnabled)}
          />
        </div>
      </div>
      <div className={"fixed-top"}>
        <a href="https://crisboarna.github.io/focusly" target="_blank">
          <img
            src={extensionEnabled ? focuslyLogoEnabled : focuslyLogoDisabled}
            className="logo"
            alt="Focusly logo"
          />
        </a>
        <h1>Focusly</h1>
      </div>
      <div className="fixed-top-left">
        <button onClick={() => setDomains([])}>Reset</button>
      </div>
      <div className={"body"}>
        <Options domains={domains} setDomains={setDomains} />
      </div>
    </>
  );
}

export default App;
