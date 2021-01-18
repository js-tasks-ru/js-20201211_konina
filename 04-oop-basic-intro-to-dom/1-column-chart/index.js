export default class ColumnChart {
  constructor(options = {
    data: [],
    label: '',
    value: 0,
    link: null
  }) {
    this.render(options);
    this.initEventListeners();
  }

  render(options) {
    const {data, label, value, link} = options;
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="column-chart${data.length ? '' : ' column-chart_loading'}" style="--chart-height: 50">
      <div class="column-chart__title">
        ${label}
        ${link ? `<a href="/${link}" class="column-chart__link">View all</a>` : ''}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${value}</div>
        <div data-element="body" class="column-chart__chart">
          ${ColumnChart.createColumns(data)}
        </div>
      </div>
    </div>
    `;

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке 7
    this.element = element.firstElementChild;
  }

  static createColumns(data) {
    const columns = data => ColumnChart.getColumnProps(data)
      .map(({value, percent}) => `<div style="--value: ${value.toString()}" data-tooltip="${percent}"></div>`)
      .join('');

    return data.length ? columns(data) : '';
  }

  static getColumnProps(data, chartHeight = 50) {
    const maxValue = Math.max(...data);
    const scale = chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  get chartHeight() {
    const value = parseInt(getComputedStyle(this.element).getPropertyValue('--chart-height'));
    return isFinite(value) ? value : 0;
  }

  update(data) {
    this.element.querySelector('.column-chart__chart').innerHTML = ColumnChart.createColumns(data);
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
