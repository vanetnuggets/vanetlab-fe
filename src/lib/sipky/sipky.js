import { nodes, containers } from "../../store/store";
import LeaderLine from 'leader-line-new';

export default class Sipky {
    
    constructor() {
        this.lines = {}
        this.colors = {}
        this.counter = 0
        nodes.subscribe(val => {
            for (const [key, line_arrs] of Object.entries(this.lines)) {
                line_arrs.forEach(line => {
                    line.position()
                });
              }
        });
        containers.subscribe(val => {
            // array exists and is not empty
            // console.log(this.lines)
            val.forEach(container => {
                let i = container.id
                let si = i.toString()
                if (this.colors[si] === undefined){
                    this.colors[si] = this.createColor()
                }
                if (Array.isArray(val) && val.length) {
                    this.counter = val[i].nodes.length
                    if (val[i].nodes.length > 1) {
                        if (this.lines[si] !== undefined) {
                            this.lines[si].forEach(line => {
                                line.remove()
                            });
                            this.lines[si] = []
                            // this.lines[si] = []
                        }
                        val[i].nodes.forEach(id1 => {
                            val[i].nodes.slice(-this.counter).forEach(id2 => {
                                if (id1 != id2) {
                                    // console.log('arraw btw nodes number: ', id1, id2)
                                    let new_line = new LeaderLine(
                                        document.getElementById(id1.toString()),
                                        document.getElementById(id2.toString()),
                                        {path: 'straight', endPlug: 'behind', color: this.colors[si]}
                                    );
                                    if (this.lines[si] === undefined) {
                                        this.lines[si] = []
                                    }
                                    this.lines[si].push(new_line)
                                }
                            });
                            this.counter -= 1
                        });
                    }else {
                        if (this.lines[si] !== undefined && this.lines[si][0] != null) {
                            this.lines[si][0].remove()
                            this.lines[si] = []
                            // this.lines[si] = []
                        }
                    }
                }
            });
        })
    }

    createColor() {
        let n1 = this.genNum(0, 255).toString()
        let n2 = this.genNum(0, 255).toString()
        let n3 = this.genNum(0, 255).toString()
        return 'rgb('+n1+', '+n2+', '+n3+')'
    }

    genNum(min, max) {
        return Math.random() * (max - min) + min;
    }
}