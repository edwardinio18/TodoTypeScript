import Component from '../Component/Component';
import style from './FormField.css';

class FormField extends Component {
    constructor() {
        super();

        if (!this.shadowRoot) {
            this.attachShadow({
                mode: 'open',
            });
        }
    }

    render(): void {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="form-field">
          <label><slot name="label"></slot></label>
          <input type="text" />
          <div class="error">This field cannot be empty</div>
        </div>
      `;
        }
    }

    get value(): string {
        const input = this.shadowRoot?.querySelector('input');
        return input ? input.value : '';
    }

    set value(newValue: string) {
        const input = this.shadowRoot?.querySelector('input');
        if (input) {
            input.value = newValue;
        }
    }

    validate(): boolean {
        const input = this.shadowRoot?.querySelector('input');
        const error = this.shadowRoot?.querySelector('.error') as HTMLElement;
        if (input && input.value.trim() === '') {
            if (error) {
                error.style.display = 'block';
            }
            return false;
        } else {
            if (error) {
                error.style.display = 'none';
            }
            return true;
        }
    }
}

customElements.define('formfield-component', FormField);
