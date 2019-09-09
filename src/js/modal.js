import {
    disableBodyScroll,
    enableBodyScroll,
} from 'body-scroll-lock';
import loadTemplate from './template';

export class Modal {
    constructor(data) {
        this.data = data;
        this.id = Date.now();
    }

    open() {
        const template = loadTemplate('modal');
        const render = template(this.data);
        this.$modal = $(render);

        $(document.body)
            .addClass('has-modal')
            .append(this.$modal);

        disableBodyScroll(this.$modal);

        this.$modal.on('click', '.js-close', (evt) => {
            evt.stopPropagation();

            if (evt.target.classList.contains('js-close')) {
                this.close();
            }
        });

        $(document).on(`keydown.${this.id}`, (evt) => {
            if (evt.keyCode === 27) {
                this.close();
            }
        });
    }

    close() {
        $(document.body).removeClass('has-modal');

        enableBodyScroll(this.$modal);

        $(document).off(`keydown.${this.id}`);
        this.$modal.remove();
    }
}

export default function openModal(data) {
    const modal = new Modal(data);
    modal.open();

    return modal;
}
