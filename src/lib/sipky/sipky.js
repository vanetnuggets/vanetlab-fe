import { nodes, containers } from "../../store/store";
import LeaderLine from 'leader-line-new';
import { onMount} from 'svelte'

export default class Sipky {
    
    constructor() {
        this.arrows = []
        this.draw = 0
        this.lines = []
        this.counter = 0
        nodes.subscribe(val => {
            this.lines.forEach(line => {
                line.position()
            });
        });
        containers.subscribe(val => {
            console.log('++++++++++++++++++++++++++++++++++++++')
            if (Array.isArray(val) && val.length) {
                // array exists and is not empty
                this.counter = val[0].nodes.length
                if (val[0].nodes.length > 1) {
                    // this.lines.forEach(line => {
                    //     line.remove()
                    // });
                    val[0].nodes.forEach(id1 => {
                        val[0].nodes.slice(-this.counter).forEach(id2 => {
                            if (id1 != id2) {
                                console.log(id1, id2)
                                let new_line = new LeaderLine(
                                    document.getElementById(id1.toString()),
                                    document.getElementById(id2.toString())
                                );  
                                this.lines.push(new_line)
                            }
                        });
                        this.counter -= 1
                    });
                }
            }
        })
    }
}