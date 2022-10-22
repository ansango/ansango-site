import { Container } from "components/common";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const { asPath } = useRouter();
    return (
      <header>
        <Container className="pt-6 sm:py-12">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              {asPath !== "/" && (
                <Link href="/">
                  <a className="link link-hover">ansango</a>
                </Link>
              )}
            </div>

            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                          <a
                            className={`${isActive && "underline font-medium"}`}
                          >
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
