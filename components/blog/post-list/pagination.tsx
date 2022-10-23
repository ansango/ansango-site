export const Pagination = ({
  pageNumbers = [],
  onPagination,
  currentPage = 0,
}: {
  pageNumbers: number[];
  onPagination: (page: any) => void;
  currentPage: number;
}) => {
  return (
    <div className="flex justify-center py-5 space-x-5 btn-group">
      {pageNumbers.length !== 1 &&
        pageNumbers.map((number) => {
          const cn = currentPage === number ? `btn btn-active` : `btn`;

          return (
            <button
              className={cn}
              key={number}
              onClick={onPagination}
              id={number.toString()}
            >
              {number}
            </button>
          );
        })}
    </div>
  );
};
