import { tagsSearcher } from "constants/tags";

export const Searcher = ({
  onSearch,
  onReset,
  placeholder,
  parentField = "",
}: {
  onSearch: (e: any) => void;
  onReset: () => void;
  placeholder: string;
  parentField: string;
}) => {
  const handleTag = (tag: string) => {
    onReset();
    onSearch({ target: { value: tag } });
  };

  return (
    <>
      <div
        className="relative max-w-lg"
        data-tinafield={`${parentField}.search`}
      >
        <input
          aria-label="Search"
          type="text"
          onChange={onSearch}
          onFocus={onReset}
          placeholder={placeholder}
          className="input w-full input-primary border-2 transition-all"
        />

        <span className="absolute top-0 right-0 translate-y-2/4 -translate-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </div>
      <ul>
        <li
          className="badge hover:bg-secondary-focus mr-1 badge-secondary cursor-pointer"
          onClick={() => handleTag("")}
        >
          todas
        </li>
        {tagsSearcher.map((tag, i) => (
          <li
            className="badge hover:bg-accent-focus mr-1 badge-accent cursor-pointer"
            key={`${tag}-${i}`}
            onClick={() => handleTag(tag)}
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
};
