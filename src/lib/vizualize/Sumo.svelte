<script>
    import xml2js from "xml2js";

    function handleFileInput(event) {
        console.log(event);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const xmlData = reader.result;
            xml2js.parseString(xmlData, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const timesteps = result["fcd-export"].timestep;
                const vehicleDataByTimestep = {};
                timesteps.forEach((timestep) => {
                    console.log(timestep);
                    const timestamp = timestep.$.time;
                    const vehicles = timestep.vehicle;
                    console.log(vehicles);
                    if (vehicles !== undefined) {
                        const vehicleObjects = vehicles.map((vehicle) => {
                            return {
                                id: vehicle.$.id,
                                x: vehicle.$.x,
                                y: vehicle.$.y,
                                angle: vehicle.$.angle,
                                type: vehicle.$.type,
                                speed: vehicle.$.speed,
                                pos: vehicle.$.pos,
                                lane: vehicle.$.lane,
                                slope: vehicle.$.slope,
                            };
                        });
                        vehicleDataByTimestep[timestamp] = vehicleObjects;
                    }
                });

                console.log(vehicleDataByTimestep);
            });
        };

        reader.readAsText(file);
        event.target.value = "";
    }
</script>

<div>
    <input type="file" on:change={handleFileInput} />
</div>
