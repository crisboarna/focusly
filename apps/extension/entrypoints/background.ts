import { browser } from "wxt/browser";
import {
  domainsEnabled,
  extensionEnabled,
  extensionPreviousEnabled,
} from "@/utils/storage.ts";

const iconSizes = [16, 32, 48, 96, 128];
const generateIcons = (type: "enabled" | "disabled") => {
  const path: { [key: number]: string } = {};
  iconSizes.forEach((size) => {
    path[size] = `icon/${type}/${size}.png`;
  });
  return { path };
};

export default defineBackground(() => {
  const reload = () => browser.runtime.reload();

  const execute = (enabled: boolean) => {
    if (!enabled) {
      browser.action.setIcon(generateIcons("disabled"));
      extensionPreviousEnabled.getValue().then((singleton) => {
        if (singleton) {
          extensionPreviousEnabled.setValue(false).then(() => reload());
        }
      });
    } else {
      browser.action.setIcon(generateIcons("enabled"));
      extensionPreviousEnabled.getValue().then((singleton) => {
        if (!singleton) {
          extensionPreviousEnabled
            .setValue(true)
            .then(() => browser.runtime.reload());
        }
      });
    }
  };

  // gets on first run the current state of the extension enabled state
  extensionEnabled.getValue().then(execute);

  // listens for changes in extension enabled state
  extensionEnabled.watch(execute);
  // listens for configured domains changes and if the extension is enabled and
  // on applicable url reloads the extension
  domainsEnabled.watch(() =>
    extensionEnabled.getValue().then((enabled) => enabled && reload()),
  );
});
