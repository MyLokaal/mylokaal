const Navigation = ({ settings }) => (
  <header className="w-full bg-white">
    <nav className="" role="navigation">
      <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
        <div className="mr-4 md:mr-8">
          <a href="/" className="block px-4">
            My Lokaal
          </a>
        </div>
        <div className="ml-auto md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded"
            type="button"
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-auto md:flex-grow md:flex md:items-center">
          <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 md:ml-auto lg:mr-8 md:border-0">
            <li>
              <a href="/" className="block px-4 py-1 md:p-2 lg:px-8">
                Home
              </a>
            </li>
          </ul>
          <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:border-0">
            <li>
              <a
                href="/"
                className="block px-4 py-1 md:p-2 rounded-lg lg:px-4 bg-black text-white"
              >
                EN
              </a>
            </li>
            <li>
              <a href="/" className="block px-4 py-1 md:p-2 rounded-lg lg:px-4">
                DE
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Navigation;
