import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateBtnMarkup(curPage, left = false, right = true) {
    const rightBtn = `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;

    const leftBtn = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;

    if (left && right) {
      return rightBtn + leftBtn;
    }

    return right ? rightBtn : leftBtn;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && numPages > 1) {
      return this._generateBtnMarkup(currentPage, false, true);
    }

    if (currentPage === numPages && numPages > 1) {
      return this._generateBtnMarkup(currentPage, true, false);
    }

    if (currentPage < numPages) {
      return this._generateBtnMarkup(currentPage, true, true);
    }

    return '';
  }
}

export default new PaginationView();
