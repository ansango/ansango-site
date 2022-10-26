import { Container } from "components/common";
import { FC, MouseEvent } from "react";
import {
  EmailShareButton as Email,
  TelegramShareButton as Telegram,
  TwitterShareButton as Twitter,
  WhatsappShareButton as Whatsapp,
} from "react-share";
import { SiWhatsapp, SiTelegram, SiMaildotru, SiTwitter } from "react-icons/si";
import { type IconType } from "react-icons";
import { eEngagementEvents } from "lib/google/analytics";

type Type = "twitter" | "telegram" | "whatsapp" | "email";

const buttons: {
  name: Type;
  Component: any;
  Icon: IconType;
}[] = [
  {
    name: "email",
    Component: Email,
    Icon: SiMaildotru,
  },
  {
    name: "telegram",
    Component: Telegram,
    Icon: SiTelegram,
  },
  {
    name: "twitter",
    Component: Twitter,
    Icon: SiTwitter,
  },
  {
    name: "whatsapp",
    Component: Whatsapp,
    Icon: SiWhatsapp,
  },
];

export const SocialShare: FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  const { eShare } = eEngagementEvents;
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    social: string
  ) => {
    e.preventDefault();
    eShare({ label: social });
  };
  return (
    <Container className="py-0 lg:py-0 flex w-full justify-end">
      <div className="space-x-2">
        {buttons.map(({ name, Component, Icon }, index) => {
          return (
            <span
              key={`${name}-${index}`}
              className="btn btn-link text-secondary hover:text-secondary-focus btn-sm btn-circle transition-colors duration-200"
            >
              <Component
                url={url}
                title={title}
                onClick={(
                  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
                ) => handleClick(e, name)}
              >
                <Icon className="text-2xl" />
              </Component>
            </span>
          );
        })}
      </div>
    </Container>
  );
};
