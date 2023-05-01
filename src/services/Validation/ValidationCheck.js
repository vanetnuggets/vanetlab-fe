import { nodes } from "../../store/scenario";
import {l2_optional_attributes, l3_optional_attributes,l3_attributes} from "../../store/validation";
import { get } from 'svelte/store'

export function validationCheck() {
    let error_nodes = []
    Object.values(get(nodes)).forEach(node => {
        if(node.l2id == null || node.l2 == null || node.l3 == null)
            error_nodes.push(node.id)
        else {
            if(node.l2conf.attributes!= undefined){         // l2conf[attibute]
                Object.entries(node.l2conf.attributes).forEach(l2_o_a => {
                    const result = get(l2_optional_attributes)[node.l2][l2_o_a[0]].validation(l2_o_a[1],null)
                    if (!result.valid && !error_nodes.includes(node.id))
                        error_nodes.push(node.id)
                });
            }
            if(!error_nodes.includes(node.id) && node.l3conf.attributes!= undefined){   // l3conf[attibute]
                Object.entries(node.l3conf.attributes).forEach(l3_o_a => {
                    const result = get(l3_optional_attributes)[node.l3][l3_o_a[0]].validation(l3_o_a[1],null)
                    if (!result.valid && !error_nodes.includes(node.id))
                        error_nodes.push(node.id)
                });
            } 
            if(!error_nodes.includes(node.id)){   //l3conf
                Object.entries(node.l3conf).forEach(l3 => {
                    if(l3[0] != "attributes"){
                        const result = get(l3_attributes)[l3[0]].validation(l3[1],node.l3conf.start)
                        if (!result.valid && !error_nodes.includes(node.id))
                            error_nodes.push(node.id)
                    }
                });
            }
        }

    });
    return error_nodes
}