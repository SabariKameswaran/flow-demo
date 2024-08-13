import { LitElement, html, css } from 'lit';

class EdgeElement extends LitElement {
  static properties = {
    edge: { type: Object },
    nodes: { type: Array },
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
    if (!this.edge || !this.nodes) return html``;

    const sourceNode = this.nodes.find(node => node.id === this.edge.sourceId);
    const targetNode = this.nodes.find(node => node.id === this.edge.targetId);

    if (!sourceNode || !targetNode) return html``;

    const x1 = sourceNode.x;
    const y1 = sourceNode.y;
    const x2 = targetNode.x;
    const y2 = targetNode.y;

    return html`
      <svg width="100%" height="100%">
        <line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="black" stroke-width="2" />
      </svg>
    `;
  }
}

customElements.define('edge-element', EdgeElement);