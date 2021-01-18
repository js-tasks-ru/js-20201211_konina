export default class SortableTable {
  subElements = {};

  constructor(
    headerData = [],
    bodyData = {data: []}
  ) {
    this.headerData = headerData;
    this.data = bodyData.data;

    this.render();
  }

  get tableHeader() {
    return this.headerData.length ?
      this.headerData.map(({id, title, sortable}) => `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
            <span>${title}</span>
          </div>`
      ).join('') : '';
  }

  getTableCell(key, value) {
    switch (key) {
    case 'images':
      return `
        <div class="sortable-table__cell">
          ${value[0]?.url ? `<img class="sortable-table-image" alt="Image" src="${value[0]?.url}">` : ''}
        </div>
      `;
    default:
      return `<div class="sortable-table__cell">${value}</div>`;
    }
  }

  get tableBody() {
    return this.data.length ?
      this.data.map(item => `
        <a href="${''}" class="sortable-table__row">
          ${this.headerData.map(({id}) => this.getTableCell(id, item[id])).join('')}
        </a>`
      ).join('') : '';
  }

  get template() {
    return `
    <div class="sortable-table">
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.tableHeader}
      </div>
      <div data-element="body" class="sortable-table__body">
        ${this.tableBody}
      </div>
      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
    </div>
    `;
  }

  static sortStrings(data, field, direction) {
    return data.sort((item1, item2) => direction * item1[field].localeCompare(item2[field], ['ru', 'en'], {caseFirst: 'upper'})
    );
  }

  static sortNumbers(data, field, direction) {
    return data.sort((item1, item2) =>
      direction * (item1[field] - item2[field]));
  }

  sort(field, direction) {
    const sortDirection = direction === 'asc' ? 1 : -1;
    const sortType = this.getSortType(field);
    if (sortType === 'string') {
      SortableTable.sortStrings(this.data, field, sortDirection);
    } else if (sortType === 'number') {
      SortableTable.sortNumbers(this.data, field, sortDirection);
    }
    const {body} = this.subElements;
    body.innerHTML = this.tableBody;
  }

  getSortType(field) {
    return this.headerData.find(item => item.id === field)['sortType'];
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // this.element = null;
    // this.subElements = {};
  }
}

