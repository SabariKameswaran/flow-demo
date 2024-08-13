import { LitElement, html, css } from 'lit';

class NodeElement extends LitElement {
  static properties = {
    node: { type: Object },
  };

  static styles = css`
    :host {
      position: absolute;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      cursor: move;
      user-select: none;
    }
    input {
      width: 100%;
      box-sizing: border-box;
    }
    .connect-button {
      margin-top: 5px;
    }
  `;

  render() {
    return html`
      <input
        type="text"
        .value=${this.node.name}
        @change=${this._handleNameChange}
      >
      <button class="connect-button" @click=${this._requestConnection}>Connect</button>
    `;
  }

  firstUpdated() {
    this._makeDraggable();
  }

  _makeDraggable() {
    let isDragging = false;
    let startX, startY;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX - this.node.x;
      startY = e.clientY - this.node.y;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - startX;
        const newY = e.clientY - startY;
        this._updatePosition(newX, newY);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    this.addEventListener('mousedown', onMouseDown);
  }

  _updatePosition(x, y) {
    this.node = { ...this.node, x, y };
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    this._emitUpdate();
  }

  _handleNameChange(e) {
    this.node = { ...this.node, name: e.target.value };
    this._emitUpdate();
  }

  _emitUpdate() {
    this.dispatchEvent(new CustomEvent('nodeupdate', {
      detail: this.node,
      bubbles: true,
      composed: true,
    }));
  }

  _requestConnection() {
    this.dispatchEvent(new CustomEvent('connectrequest', {
      detail: { sourceId: this.node.id },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('node-element', NodeElement);