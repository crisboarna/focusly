'use client';

export default function Shields() {
  const openNewTab = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-16 items-start md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks>

            <div className="relative flex flex-col items-center" data-aos="fade-up"
                 data-aos-anchor="[data-aos-id-blocks]">
              <img
                src={"/focusly/shield-chrome.png"}
                className="power-icon"
                alt="Chrome Extension Store"
                onClick={() => openNewTab("https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en")}
              />
            </div>

            <div className="relative flex flex-col items-center pt-4" data-aos="fade-up"
                 data-aos-anchor="[data-aos-id-blocks]">
              <img
                src={"/focusly/shield-firefox.png"}
                className="power-icon"
                alt="Firefox Addon Store"
                onClick={() => openNewTab("https://addons.mozilla.org/en-US/firefox/addon/focusly-active-focused-tabs")}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
