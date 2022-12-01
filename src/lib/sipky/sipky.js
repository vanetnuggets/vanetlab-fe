import { nodes, containers } from "../../store/store";
import LeaderLine from 'leader-line-new';

class Sipky {
    static on_delete(node_id) {
        throw new Error('Method not implemented.');
    }
    
    constructor() {
        this.lines = {}
        this.colors = {}
        this.counter = 0

        this.connections = {}
        this.containers = []

        this.nodes = []
        let me = this;

        this.active = false;

        nodes.subscribe(val => {
            me.nodes = val;
        });

        containers.subscribe(containers => {
            me.containers = containers;
            me.genocide();
            me.redraw();
        });
    }

    redraw() {
        for (let container of this.containers) {
            let color = this.get_color(container);

            let node_len = container.nodes.length;
            if (node_len < 2) {
                continue;
            }

            for(let node_1 of container.nodes) {
                for(let node_2 of container.nodes) {
                    if (node_1 == node_2) {
                        continue
                    }
                    const [n1, n2] = this.get_friends(node_1, node_2);
                    if (n1 == null || n2 == null) {
                        continue
                    }
                    this.add_line(n1, n2, color, container.type);
                }
            }
        }
    }

    genocide() {
        for(let line of Object.values(this.lines)) {
            line.remove()
        }
        this.connections = {}
        this.lines = {}
    }

    enable() {
        this.active = true;
        this.redraw();
    }

    disable() {
        this.active = false;
        this.genocide()
    }

    get_friends(n1, n2) {
        let node_1 = null;
        let node_2 = null;
        for (let node of this.nodes) {
            if (node.id == n1) {
                node_1 = node;
            } else if (node.id == n2) {
                node_2 = node;
            }
        }
        return [node_1, node_2]
    }

    add_line(node1, node2, color, container_type) {
        if (this.active == false) {
            return
        }

        let min = Math.min(node1.id, node2.id).toString();
        let max = Math.max(node1.id, node2.id).toString();
        let conn = `${min}_${max}`;

        if (this.lines[conn] !== undefined) {
            return
        }

        let decorator = {
            dash: false
        }

        let new_line = new LeaderLine(
            node1.element,
            node2.element,
            {
                path: 'straight',
                endPlug: 'behind',
                color: color
            }
        )

        if (container_type == 'wifi') {
            new_line.dash = {
                animation: true
            }
        }

        this.lines[conn] = new_line;
        
        if (min in this.connections == false ) {
            this.connections[min] = []
        }

        if (max in this.connections == false ) {
            this.connections[max] = []
        }

        this.connections[min].push(conn);
        this.connections[max].push(conn);
    }

    on_delete(node_id_) {
        if (this.active == false) {
            return
        }

        let node_id = node_id_.toString();

        if (node_id in this.connections == false) {
            return;
        }
        let conn_map = this.connections[node_id];
        
        for (let conn of conn_map) {
            const [n1, n2] = conn.split('_');

            this.lines[conn].remove();
            
            this.connections[n1] = this.connections[n1].filter(elem => elem != conn);
            this.connections[n2] = this.connections[n2].filter(elem => elem != conn);

            delete this.lines[conn];
        }
    }

    update(id) {
        if (this.active == false) {
            return
        }

        let conn_map = this.connections[id];
        if (conn_map == undefined) {
            return;
        } 
        for (let conn of conn_map) {
            if (this.lines[conn] != undefined) {
                this.lines[conn].position()
            }   
        }
    }

    get_color(container) {
        let cont_id = container.id;
        if (this.colors[cont_id] === undefined) {
            this.colors[cont_id] = this._createColor();
        }
        return this.colors[cont_id];
    }

    _createColor() {
        let n1 = this.genNum(0, 255).toString()
        let n2 = this.genNum(0, 255).toString()
        let n3 = this.genNum(0, 255).toString()
        return 'rgb('+n1+', '+n2+', '+n3+')'
    }

    genNum(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default new Sipky();
