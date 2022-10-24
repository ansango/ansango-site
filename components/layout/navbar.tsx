import { Container } from "components/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useMounted } from "lib/hooks";

const routes = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Bio",
    href: "/bio",
  },
];

export const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();
  const { asPath } = useRouter();

  return (
    <header>
      <Container className="pt-6 sm:py-12">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            {isMounted && asPath !== "/" && (
              <Link href="/">
                <a className="link no-underline font-serif font-semibold text-2xl md:text-3xl hover:text-primary transition-colors duration-300">
                  ansango
                </a>
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <button
              className="btn btn-ghost hover:btn-secondary btn-circle transition-all duration-300"
              onClick={() => setTheme(theme !== "cmyk" ? "cmyk" : "night")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                {theme !== "cmyk" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                )}
              </svg>
            </button>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle hover:btn-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {routes.map((route) => {
                  const isActive = asPath === route.href;
                  return (
                    <li key={route.href}>
                      <Link href={route.href}>
                        <a className={`${isActive && "underline font-medium"}`}>
                          {route.label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
