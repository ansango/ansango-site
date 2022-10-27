export type TechStackProps = {
  group?: {
    label: string;
    tools?: {
      label: string;
      bgColor: string;
      labelColor: string;
      logoColor: string;
    }[];
  }[];
};

const composeQuery = ({
  label = "HTML5",
  bgColor = "#000",
  labelColor = "#101010",
  logoColor = "#fff",
}) => {
  const logo = label.toLowerCase();
  const bgC = bgColor.replace("#", "");
  const labelC = labelColor.replace("#", "");
  const logoC = logoColor.replace("#", "");
  return `https://img.shields.io/badge/${logo}-${bgC}?style=for-the-badge&logo=${logo}&logoColor=${logoC}&labelColor=${labelC}`;
};

export const TechStack = ({ group, ...props }: TechStackProps) => {
  return (
    <div className="flex gap-5 flex-col">
      {group?.map((gr, i) => (
        <div className="flex gap-5 flex-wrap" key={`${i}-${gr.label}`}>
          {gr?.tools?.map((tool, i) => (
            <img
              className="my-0"
              key={`${i}-${tool.label}`}
              src={composeQuery(tool)}
              alt={tool.label}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
