type ButtonProps = {
    setPage: (value: number | ((prev: number) => number)) => void;
    totalPages: number;
    page: number;
};

export const Button = ({ setPage, totalPages, page }: ButtonProps) => {
    return (
        <>
            <div className="pagination">
        <button
          onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="text-[12px] md:text-[18px] text-white font-bolder">Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
        
        </>
    )
}