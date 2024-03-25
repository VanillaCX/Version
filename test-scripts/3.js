console.log("test-script-2 running...");



const original =        "Hey My name is Lee"
const iteration1 =      "Hey My nams is Lee"

console.log("original\n:", original)
console.log("iteration1\n:", iteration1)

const splitInChunks = (text, chunkSize = 3) => {
    let startIndex = 0;
    const textLength = text.length;
    const lines = []
    

    while(startIndex < textLength){
        const endIndex = startIndex + chunkSize
        const line = text.substring(startIndex, endIndex)
        lines.push(line)

        startIndex = endIndex
    }


    return lines
}

const fill = (char, length) => {
    return `${char}`.repeat(length)
}

const test = (text_a, text_b) => {
    const chunks = splitInChunks(text_b);
    let text_a_copy = text_a;

    console.log("chunks:\n", chunks);

    for (chunk of chunks){
        console.log("Search for chunk", chunk);


        text_a_copy = text_a_copy.replace(chunk, fill("-", chunk.length))

    }

    return text_a_copy
}


const compare = (v1, v2, original, iteration) => {
    const length = Math.max(v1.length, v2.length)
    let index = 0
    const changes = {}
    let change = null;
    let v1_char;
    let v2_char;
    let diff;

    while(index < length) {

        left = v1[index];
        right = v2[index];

        if (index > 0) {
            previous_left = original[index - 1];
            previous_right = iteration[index - 1];
        } else {
            previous_left = ""
            previous_right = ""
        }

        

        left_value = original[index];
        right_value = iteration[index];

        if(left === right){
            // IGNORE
            diff = null
        } else {

            if (right === "-"){
                // Either an INSERT or IGNORE due to it being in previous position

                console.log("left_value:", left_value)
                console.log("previous_right:", previous_right)

                if (right == "-") {
                    

                    if (left_value == previous_right){
                        // Ignore
                    } else {
                        changes[index] = {
                            action: "remove",
                        }

                    }

                
                } else {
                    changes[index] = {
                        action: "insert",
                        char: left_value
                    }

                }

                
                
            } else if(left === "-") {

                if(right_value == previous_left){
                    // Ignore
                } else {
                    // Its an insert
                    changes[index] = {
                        action: "insert",
                        char: right_value
                    }

                }

                
            } else {
                changes[index] = {
                    action: "replace",
                    char: right
                }
            }


            
        }

        /**let change = null;

        if (left === undefined && right !== undefined) {
            // need to count subtractions/addition delta and ignore that many trailing undefineds
            change = {
                index,
                type: "addition",
                value: right_value
            }
        } else if (left !== undefined && right === undefined) {
            change = {
                index,
                type: "subtract",
            }
        } else if (left !== "-" && right !== "-") {
    
            if (left !== right) {
                change = {
                    index,
                    type: "replace",
                    char: right_value
            }
            }
    
        } else if (left !== "-" && right == "-") {
            change = {
                index,
                type: "insert",
                char: left_value
            }
        }


        if (change) {
            // There is a difference
            changes.push({...change})

        }  */
        index += 1
    }

    

    return changes
}


const v1 = test(original, iteration1)
const v2 = test(iteration1, original)

console.log("v1:\n", v1);
console.log("v2:\n", v2);

const smooth = (original_mask, iteration_mask, original, iteration) => {
    console.log("Smooth out:");
    console.log(original_mask)
    console.log(iteration_mask)

    let original_mask_array = Array.from(original_mask)
    let iteration_mask_array = Array.from(iteration_mask)

    const length = Math.max(original_mask.length, iteration_mask.length)
    let index = 0;

    while(index < length) {
        output = `${original_mask_array[index]} ${iteration_mask_array[index]}`
        if (original_mask_array[index] === iteration_mask_array[index]) {
            original_mask_array[index] = "-"
            iteration_mask_array[index] = "-"

            output += `     - -`
        } else {
            output += `     ${output}`
        }

        output += `    ${original[index]} ${iteration[index]}`

        console.log(output)

        index+=1
    }

    return {
        original_mask: original_mask_array.join(""),
        iteration_mask: iteration_mask_array.join("")
    }
}

const {original_mask, iteration_mask} = smooth(v1, v2, original, iteration1)


console.log("original_mask: ", original_mask)
console.log("iteration_mask:", iteration_mask)
const changes = compare(v1, v2, original, iteration1)

console.log("changes:\n", changes);

const rebuildFromDiff = (original, changes) => {
    console.log("changes: ", changes)
    let rebuilt = original;

    for (const [index, diff] of Object.entries(changes)) {

        let rebuiltAsArray = Array.from(rebuilt)

        if (diff.action == "replace"){
            rebuiltAsArray[index] = diff.char

        } else if (diff.action == "insert") {
            rebuiltAsArray.splice(index, 0, diff.char)


        } else if (diff.action == "remove") {
            rebuiltAsArray.splice(index, 1)

        }


        rebuilt = rebuiltAsArray.join("")

      }

    
    return rebuilt
}



const rebuilt = rebuildFromDiff(original, changes)

console.log("rebuilt:", rebuilt);