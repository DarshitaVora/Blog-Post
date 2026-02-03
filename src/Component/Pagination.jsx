import "./Pagination.css";
export default function Pagination({currentPage,totalPages,onPrev,onNext,postPerPage, onPageSizeChange}){


 // **Check that the total pages are less than 1 or the current page and total pages are the same**
   const isNextDisabled = totalPages <= 1 || currentPage === totalPages;

    return(
        <>
        <div className="pagination-ui">

            <select value={postPerPage}
             onChange={(e) => onPageSizeChange(Number(e.target.value))}
  className="drop-page">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                
            </select>
  <button 
         className="page-btn"
         onClick={onPrev}
         disabled={currentPage==1}
  >
    PREV
  </button>
  <span className="page-text">{currentPage} to {totalPages}</span>

  <button 
        className="page-btn" 
        onClick={onNext}
        // New condition
        disabled={isNextDisabled} 
  >
    NEXT
  </button>
</div>
        </>

    );
}



