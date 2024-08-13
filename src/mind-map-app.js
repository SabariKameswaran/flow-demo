import { LitElement, html, css } from 'lit';
import './node-element.js';
import './edge-element.js';

class MindMapApp extends LitElement {
  static properties = {
    nodes: { type: Array },
    edges: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100vh;
    }
    .create-button {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  `;

  constructor() {
    super();
    this.nodes = [];
    this.edges = [];
  }

  render() {
    return html`
      <button class="create-button" @click=${this._createNode}>Create Node</button>
      ${this.nodes.map(node => html`
        <node-element
          .node=${node}
          @nodeupdate=${this._handleNodeUpdate}
          @connectrequest=${this._handleConnectRequest}
        ></node-element>
      `)}
      ${this.edges.map(edge => html`
        <edge-element .edge=${edge}></edge-element>
      `)}
    `;
  }

  _createNode() {
    const nodeName = prompt('Enter node name:');
    if (nodeName) {
      const newNode = {
        id: Date.now(),
        name: nodeName,
        x: 100,
        y: 100,
      };
      this.nodes = [...this.nodes, newNode];
    }
  }

  _handleNodeUpdate(e) {
    const updatedNode = e.detail;
    this.nodes = this.nodes.map(node => 
      node.id === updatedNode.id ? updatedNode : node
    );
    this._updateEdges();
  }

  _handleConnectRequest(e) {
    const { sourceId, targetId } = e.detail;
    if (sourceId !== targetId) {
      const newEdge = {
        id: `${sourceId}-${targetId}`,
        sourceId,
        targetId,
      };
      this.edges = [...this.edges, newEdge];
    }
  }

  _updateEdges() {
    this.edges = this.edges.map(edge => ({...edge}));
  }
}

customElements.define('mind-map-app', MindMapApp);