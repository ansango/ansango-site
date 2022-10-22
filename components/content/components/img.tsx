export const img = (
  props:
    | {
        url: string;
        caption?: string | undefined;
        alt?: string | undefined;
      }
    | undefined
) => (
  <span className="flex items-center justify-center">
    <img
      src={props?.url}
      alt={props?.alt}
      className="object-cover w-full aspect-auto"
    />
  </span>
);
