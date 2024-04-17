import Link from 'next/link'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 mr-4 flex items-center">
            <Link href="/" aria-label="Focusly" className={"flex items-center"}>
              <span>
                <img src={'/focusly/favicon.ico'} alt="Focusly" className="w-8 h-8 fill-current text-purple-600" />
              </span>
              <span className={"ml-2"}>Focusly</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
