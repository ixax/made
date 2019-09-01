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

        this.$modal.on('click', '.js-close', () => this.close());

        $(document).on(`keydown.${this.id}`, (evt) => {
            if (evt.keyCode === 27) {
                this.close();
            }
        });
    }

    close() {
        $(document.body).removeClass('has-modal');

        $(document).off(`keydown.${this.id}`);
        this.$modal.remove();
    }
}

export default function openModal(data) {
    const modal = new Modal(data);
    modal.open();

    return modal;
}
