import Api from '../../services/Api'

export async function post_sumo(text_file){
    console.log(text_file)
    let res = await Api.post("tcl", {data: text_file})
    // let res = await post("simulate", generateScenario())
    // console.log(res);

    // $summary[res.data.scenario_code] = {
    //     logs: res.data.pcap_logs,
    //     console_output: res.data.output
    // } 

    // console.log($summary)
}
