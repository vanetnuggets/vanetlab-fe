<div class="bgg">
    <div class="about-container">
        <div class="text-container">
            <div class="title">
                <h2>About the project</h2>
            </div>
            <div class="text">
                VanetLab is a project that aims to make simulation of VANET networks simpler, easier and faster. 
                The SUMO tool is capable of generation of complex vehicular network simulations and ns3 simulator is able to simulate network communication in a defined scenario.
                <br><br>
                However, in order to develop a network simulation in NS-3, one has to go through a relatively difficult installation process, a steep learning curve, 
                carve through multiple not-so-well documented examples and api docs. Then, one has to challenge their C++/python coding skills and write a scenario, all while battling unintelligible error messages. 
                If only there was a way to make the development of VANET simulations easier...
                <br><br>
                Here comes VanetLab, a cutting-edge web application that acts as an intermediary between these two tools. 
                It is capable of loading a sumo trace files, extracting the vehicular nodes along with their mobility information and load the scenario into an interactive web UI.
                The positions of each and any node can by afterwards modified to your liking.
                <br><br>
                In addition to the mobility, in VanetLab you can configure each node by adding it to a network, choosing the type of the node and apply an network-layer application on it.
                You can define multiple networks and configure peer-to-peer connections between the backbone nodes.
                <br><br>
                After defining your scenario, it is sent out to be simulated on our back-end. The simulation output is then returned back to you and can be downloaded for further analysis and visualisation in tools like NetAnim or wireshark.
            </div>
            <div class="subtitle">
                <h2>Scope and limitations</h2>
            </div>
            <div class="text">
                
                Because of the format and capabilities of the ns-3 simulator, building and maintaing the tool is not an easy task. 
                Therefore, VanetLab has some heavy limitations. At the moment it supports the following technologies:
                <ul>
                    <li class="lilpad"> Networks
                    <ul>
                        <li> IEEE802.11 - standards a, ac, b, g, n, ax, be </li>
                        <li> WAVE (IEEE802.11p, ad-hoc wifi)
                        <li> LTE networks (with limitations)
                        <li> Ethernet networks
                        <li> Point to point wired connections
                    </ul>
                    <li class="lilpad">Applications</li>
                    <ul>
                        <li>UDP echo client and server</li>
                        <li>TCP Bulk sender and TCP packet sink</li>
                    </ul>
                    <li class="lilpad">SDN Technologies</li>
                    <ul>
                        <li>Openflow switches</li>
                        <li>Learning and drop controllers</li>
                    </ul>
                </ul>
                <br>
                As of now, nodes in LTE network are not able to communicate with nodes in other networks due to routing problems. 
                Also, because of ns-3 assigning IP addresses to the UE nodes from predefined IP range, there can currently be only one LTE network.
                Thirdly, the backbone of an LTE network cannot be customized fully. 
                You can only modify the ENB and UE nodes and change the position of the PGW node.
            </div>
        </div>
        <div class="back-toolbar">
            <button class="btn-basic" on:click={() => {push('/')}}>🎾Back to menu</button>
        </div>
    </div>
    
</div>

<style>
.bgg {
    height: 100vh;
    background-color: var(--dark-2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    flex-direction: column;
}
.text-container {
    padding: 10px;
    flex-grow: 4;
    font-size: 17px;
    text-align: left;
    align-items: stretch;
}

.lilpad {
    padding-top: 10px;
}

ul {
    text-align: left;
    list-style-type: disc; /* outer bullet point style */
    padding-left: 20px;
}

li {
    text-align: left;
}

ul ul {
    text-align: left;
    list-style-type: circle; /* nested bullet point style */
}
h2 {
    padding-top: 20px;
    padding-left: 10px;
    text-align: left;
}
.text {
    padding: 10px;
    position: relative;
    text-align: left;
}
.about-container {
    padding: 10px;
    color: var(--light-1);
    text-align: center;
    width: 80%;
    background-color: var(--dark-1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
.back-toolbar {
    position:relative;
    align-self: flex-end;
    flex-direction: column;
    bottom: 0px;
    width:100%;
}
</style>

<script>
    import { push } from "svelte-spa-router";
    import { networks } from "../../store/scenario";
</script>