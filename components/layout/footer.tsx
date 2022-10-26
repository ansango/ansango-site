import { Container } from "components/common";
import Link from "next/link";
import { mapRoutes, personalRoutes, socialRoutes } from "./routes";

export const Footer = () => {
  return (
    <footer>
      <Container className="footer text-base-content">
        <ul>
          <span className="footer-title">Mapa</span>
          {mapRoutes.map((route) => {
            return (
              <li key={route.href}>
                <Link href={route.href}>
                  <a className="link link-hover hover:text-primary-focus transition-all duration-300">
                    {route.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul>
          <span className="footer-title">Personal</span>
          {personalRoutes.map((route) => {
            return (
              <li key={route.href}>
                <a
                  className="link link-hover hover:text-primary-focus transition-all duration-300"
                  href={route.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {route.label}
                </a>
              </li>
            );
          })}
        </ul>
        <ul>
          <span className="footer-title">Social</span>
          {socialRoutes.map((route) => {
            return (
              <li key={route.href}>
                <a
                  className="link link-hover hover:text-primary-focus transition-all duration-300"
                  href={route.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {route.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
};
