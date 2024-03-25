const original = "On a hot July day. Katherine Rose picked up a sturdy metal pole and jammed it under the tempting lip of a pre-cut concrete slab. Rose, communications and engagement director at Depave, a non-profit in Portland, Oregon, was sweating in the heat – but she was going to win this fight. The grubby, rectangular section of urban crust in front of her was about to move. Pushing down on her metal bar, applying it like a lever, she eased the concrete covering up and away. Now sunlight could fall once again on the ground below. A mess of gravel and dirt that was, to Rose, just bursting with potential. It feels like youre liberating soil, she says, recalling the summer gathering where she and around 50 volunteers removed roughly 1,670 sq m (18,000 sq ft) of concrete from the grounds of a local church. Its envisioning and fully realising a dream that I think we all have, says Rose. The dream, that is, of bringing nature back into our midst.The idea of depaving, sometimes known as desealing, is a simple one – replace as much concrete, asphalt and other forms of hard landscaping as possible with plants and soil. Its been around since at least 2008, when the Depave group in Portland was founded. Proponents say depaving allows water to soak into the ground, which reduces flooding in times of heavy rain – aiding the sponginess of cities. Native plants help wildlife cling on in urban spaces, and by planting trees you can increase shade, protecting residents from heatwaves. Injecting city streets with greenery may even improve peoples mental health, too.But if depaving is ever going to really take off, it will have to expand beyond a handful of eager environmentalists and volunteers. With the climate crisis deepening, some cities and even entire regions are beginning to adopt depaving as part of their climate adaptation strategies. Its time, some say, to start smashing up our concrete streets in a big way  to create spaces better for nature"
//const modified = "On a hot July day, Katherine Rose picked up a sturdy metal pole and jammed it under the tempting lip of a pre-cut concrete slab. Rose, communications and engagement director at Depave, a non-profit in Portland, Oregon, was sweating in the heat – but she was going to win this fight. The grubby, rectangular section of urban crust in front of her was about to move. Pushing down on her metal bar, applying it like a lever, she eased the concrete covering up and away. Now sunlight could fall once again on the ground below. A mess of gravel and dirt that was, to Rose, just bursting with potential. It feels like youre liberating soil, she says, recalling the summer gathering where she and around 50 volunteers removed roughly 1,670 sq m (18,000 sq ft) of concrete from the grounds of a local church. Its envisio ning and fully realising a dream that I think we all have, says Rose. The dream, that is, of bringing nature back into our midst.The idea of depaving, sometimes known as desealing, is a simple one – replace as much concrete, asphalt and other forms of hard landscaping as possible with plants and soil. Its been around since at least 2008, when the Depave group in Portland was founded. Proponents say depaving allows water to soak into the ground, which reduces flooding in times of heavy rain – aiding the sponginess of cities. Native plants help wildlife cling on in urban spaces, and by planting trees you can increase shade, protecting residents from heatwaves. Injecting city streets with greenery may even improve peoples mental health, too.But if depaving is ever going to really take off, it will have to expand beyond a handful of eager environmentalists and volunteers. With the climate crisis deepening, some cities and even entire regions are beginning to adopt depaving as part of their climate adaptation strategies. Its time, some say, to start smashing up our concrete streets in a big way  to create spaces better for nature."

//const original = "Right. I admit this is not the BEST. But, it does work (for the moment)."
const modified = "On a hot July day. Right. I admit this is not the BEST. But, it does work (for the moment)"

// Split Into Chunks by sentence
const original_chunks = original.split(".")
const modified_chunks = modified.split(".")

// Changes
const diff = {}

// Fins sentences in original text that DONT exist in modified text (ie, deleted (or modified))
original_chunks.forEach((chunk, index) => {
    const exists = modified_chunks.indexOf(chunk)
    if (exists > -1) {
    } else {
        diff[index] = {
            action: "DELETE"
        }
        
    }
})

// Fins sentences in modified text that also exist in original text (ie, unchanged)
modified_chunks.forEach((chunk, index) => {
    const exists = original_chunks.indexOf(chunk)
    if (exists > -1) {
        if(exists != index){
            if (!diff[index]){
                diff[exists] = {
                    action: "SWAP",
                    target_index: index
                }
            }
        } 
    } else {
        // Check if there is a DELETE at this index, in which case replace
        if (diff[index]) {
            diff[index] = {
                action: "REPLACE",
                chunk: chunk
            }
        } else {
            diff[index] = {
                action: "INSERT",
                chunk: chunk
            }
        }
        
    }
})


// Try to reconstruct from diff
let merged_chunks = original_chunks
let delete_count = 0
let insert_count = 0
let delta = 0
for (const [i, _diff] of Object.entries(diff)) {
    index = parseInt(i) + delta;

    if (_diff.action == "DELETE") {
        merged_chunks.splice(index, 1)
        console.log(merged_chunks[index], index)
        delta = delta - 1;
    } else if (_diff.action == "INSERT") {
        merged_chunks.splice(index, 0, _diff.chunk)
        delta = delta + 1;
    } else if (_diff.action == "REPLACE") {
        merged_chunks.splice(index, 1, _diff.chunk)
    } else if (_diff.action == "SWAP") {
        const target_index_chunk = merged_chunks[_diff.target_index + insert_count];
        merged_chunks[_diff.target_index + delta] = merged_chunks[index];
        merged_chunks[index] = target_index_chunk;

    }

}

// Finished. Just convert back to a string
const merged = merged_chunks.join(".")

// Compare with original string
console.log("diff:\n", diff)
console.log("original:\n", original)
console.log("");
console.log("modified:\n", modified)
console.log("merged:\n", merged)