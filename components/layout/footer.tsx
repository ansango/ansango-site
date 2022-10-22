import { Container } from "components/common";
import Link from "next/link";

const mapRoutes = [
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

const personalRoutes = [
  {
    label: "Film captures",
    href: "https://anibalsantosgomez.com",
  },
  {
    label: "Currículum",
    href: "/",
  },
];

const socialRoutes = [
  {
    label: "Twitter",
    href: "https://twitter.com/ansango",
  },
  {
    label: "Github",
    href: "htts://github.com/ansango",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/ansango/",
  },
];

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
                  <a className="link link-hover">{route.label}</a>
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
                  className="link link-hover"
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
                  className="link link-hover"
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
