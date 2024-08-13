import { LitElement, html, css } from 'lit';

class EdgeElement extends LitElement {
  static properties = {
    edge: { type: Object },
  };

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  `;

  render() {
    const sourceNode = this.parentElement.querySelector(`node-element[data-id="${this.edge.sourceId}"]`);
    const targetNode = this.parentElement.querySelector(`node-element[data-id="${this.edge.targetId}"]`);

    if (!sourceNode || !targetNode) return html``;

    const sourceRect = sourceNode.getBoundingClientRect();
    const targetRect = targetNode.getBoundingClientRect();

    const x1 = sourceRect.left + sourceRect.width / 2;
    const y1 = sourceRect.top + sourceRect.height / 2;
    const x2 = targetRect.left + targetRect.width / 2;
    const y2 = targetRect.top + targetRect.height / 2;

    return html`
      <svg width="100%" height="100%">
        <line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="black" />
      </svg>
    `;
  }
}

customElements.define('edge-element', EdgeElement);