export default abstract class Component extends HTMLElement {
    constructor() {
        super();

        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            });
        }
    }

    connectedCallback() {
        this.render();
    }

    abstract render(): void;
}
