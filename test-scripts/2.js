console.log("test-script-2 running...");



//const sourceText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc lobortis mattis. Vivamus arcu felis bibendum ut tristique et egestas. Duis ultricies lacus sed turpis tincidunt. Aliquam malesuada bibendum arcu vitae elementum. Donec massa sapien faucibus et molestie. Quis vel eros donec ac odio tempor orci. Augue neque gravida in fermentum et. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Scelerisque varius morbi enim nunc faucibus a pellentesque sit"
const original =    "Hello, my nam is Lee Bowyer. Please to meet you."
const iteration1 =  "Hello, my name is Lee Bowyer. Please to meet you. Here is loads new text"
//const iteration1 = "Hello, my name is Lee. Please to meet you."

/**
 * // Split into an array of lines

const splitIntoLines = (text, lineLength = 20) => {
    let startIndex = 0;
    const textLength = text.length;
    const lines = []
    

    while(startIndex < textLength){
        const endIndex = startIndex + lineLength
        const line = text.substring(startIndex, endIndex)
        lines.push(line)

        startIndex = endIndex
    }


    return lines
}

const originalLines = splitIntoLines(original, 30)
const iteration1Lines = splitIntoLines(iteration1, 30)

console.log(originalLines)
console.log(iteration1Lines)
 */



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

// Idea two.
// Split the iteration into blocks and remove the difference

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

const isDifferent = (v1_char, v2_char) => {
    let capture = false;

    if (v1_char === undefined || v2_char === undefined){
        capture = true;
    }

    if((v1_char !== "-" && v2_char !== "-") && v1_char !== v2_char){
        capture = true;
    }

    return capture
}

const compare = (v1, v2) => {
    const length = Math.max(v1.length, v2.length)
    let index = 0
    const changes = []
    let word = null;
    let v1_char;
    let v2_char;

    while(index < length) {
        console.log(`${v1_char}  ${v2_char}`)

        v1_char = v1[index];
        v2_char = v2[index];

        capture = isDifferent(v1_char, v2_char);

        if (capture) {
            // There is a difference
            if (word === null) {
                // Begining of a new word
                word = {
                    startIndex: index,
                    chars: "",
                }
            }

            word.chars += v2_char

        } else {
            // No difference. 
            if (word !== null) {
                //Save and close word
                changes.push({...word})
                word = null
            }

        }
        index += 1
    }

    if (word !== null) {
        changes.push({...word})
    }

    return changes
}

const v1 = test(original, iteration1)
const v2 = test(iteration1, original)

console.log("v1:\n", v1);
console.log("v2:\n", v2);

const changes = compare(v1, v2)

const rebuildFromDiff = (original, changes) => {
    console.log("changes: ", changes)
    let rebuilt = original;

    for (change of changes) {
        let rebuiltAsArray = Array.from(rebuilt)

        rebuiltAsArray.splice(change.startIndex, 0, change.chars)

        rebuilt = rebuiltAsArray.join("")
    }

    return rebuilt
}



const rebuilt = rebuildFromDiff(original, changes)

console.log("rebuilt:", rebuilt);