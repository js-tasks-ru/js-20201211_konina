export default class NotificationMessage {
  static showedMessage = [];

  constructor(message = '', {
    duration = 1000,
    type = 'success'
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;

    this.element = element.firstElementChild;
  }

  show(targetElement = null) {

    if (targetElement) {
      targetElement.append(this.element);
      this.element = targetElement;
    }

    if (NotificationMessage.showedMessage.length) {
      const message = NotificationMessage.showedMessage.shift();
      message.remove();
    }

    NotificationMessage.showedMessage.push(this);

    document.body.append(this.element);
    this.addAutoHide();
  }

  addAutoHide() {
    this.autoHidetimer = setTimeout(this.remove.bind(this), this.duration);
  }

  removeAutoHide() {
    if (this.autoHidetimer) {
      clearTimeout(this.autoHidetimer);
    }
  }

  remove() {
    this.removeAutoHide();
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
