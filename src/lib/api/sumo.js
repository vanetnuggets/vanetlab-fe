import Api from '../../services/Api'

export async function post_sumo(text_file){
    let res = await Api.post("tcl", {data: text_file})
    // let res = await post("simulate", generateScenario())

    // $summary[res.data.scenario_code] = {
    //     logs: res.data.pcap_logs,
    //     console_output: res.data.output
    // } 

}


export function fromSumo(data) {
    return Api.post("from-sumo", 
        data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}
