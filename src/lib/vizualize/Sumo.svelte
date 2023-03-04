<script>
    import xml2js from "xml2js";
    import {post_sumo} from '../api/sumo.js'
    
    function handleFileInput(event) {
        let files = event.target.files;
        const file = files[0];

        let reader = new FileReader();

        reader.onload = (e) => {
            const file = e.target.result;
            post_sumo(file)
        };

        reader.onerror = (e) => alert(e.target.error.name);

        reader.readAsText(file);
    }
</script>

<div>
    <input type="file" on:change={handleFileInput} />
</div>
