const fill = (char, length) => {
    return `${char}`.repeat(length)
}

const COLOR_RED = "\x1b[31m"
const COLOR_GREEN = "\x1b[32m"
const COLOR_RESET = "\x1b[0m"
const COLOR_YELLOW = "\x1b[33m"

const BG_COLOR_RED = "\x1b[41m"
const BG_COLOR_YELLOW = "\x1b[43m"

const log = (message, color = COLOR_RESET) => {
    console.log(`${color}${message}${COLOR_RESET}`)
}

const RED = (message) => {
    return `${COLOR_RED}${message}${COLOR_RESET}`
}

const GREEN = (message) => {
    return `${COLOR_GREEN}${message}${COLOR_RESET}`
}

const YELLOW = (message) => {
    return `${COLOR_YELLOW}${message}${COLOR_RESET}`
}

const BG_RED = (message) => {
    return `${BG_COLOR_RED}${message}${COLOR_RESET}`
}

const BG_YELLOW = (message) => {
    return `${BG_COLOR_YELLOW}${message}${COLOR_RESET}`
}

const diff = ({left, right}) => {
    console.group("Generating a diff bewteen")
    console.log(`left : ${left}\nright: ${right}`)
    console.groupEnd()

    // Split into chunks
    const left_chunks = []
    const right_chunks = []
    const chunkSize = 20
    let index = 0

    // Right Chunks ...
    index = 0
    while(index < right.length){
        const end = index + chunkSize
        const line = right.substring(index, end)

        right_chunks.push(line)
        index = end
    }

    console.log("right chunks:", right_chunks)

    // Left Chunks ...
    index = 0
    while(index < left.length){
        const end = index + chunkSize
        const line = left.substring(index, end)

        left_chunks.push(line)
        index = end
    }

    console.log("left chunks:", left_chunks)

    // Create left and right masks
    let left_mask = left;
    let right_mask = right;

    let left_mask_helper = left;
    let right_mask_helper = right;


    // Left Mask: Mask out any part of the string that matches a right chunk 
    for(const chunk of right_chunks) {
        left_mask = left_mask.replace(chunk, fill("_", chunk.length))
        left_mask_helper = left_mask_helper.replace(chunk, GREEN(chunk))
    }

    


    // Right Mask: Mask out any part of the string that matches a left chunk 
    for(const chunk of left_chunks) {
        right_mask = right_mask.replace(chunk, fill("_", chunk.length))
        right_mask_helper = right_mask_helper.replace(chunk, GREEN(chunk))
    }

    console.log("left_mask :", left_mask)
    console.log("right_mask:", right_mask)

    console.log("left_mask_helper: ", left_mask_helper)
    console.log("right_mask_helper:", right_mask_helper)


    // Blend left and right mask, only keeping the differences
    let blended_mask = []
    index = 0
    while(index < Math.max(left_mask.length, right_mask.length)) {
        console.log(left_mask[index], " ", right_mask[index])

        if(left_mask[index] == right_mask[index]) {

            if(left_mask[index] == "_" && right_mask[index] == "_") {
                // Ignore
                blended_mask[index] = GREEN("_")
            } else {
                blended_mask[index] = YELLOW(left_mask[index])

            }

        } else {

            if(left_mask[index] == "_" && right_mask[index] != "_"){
                blended_mask[index] = BG_YELLOW(right[index])
            } else {
                blended_mask[index] = BG_RED(left[index])

            }

        }

        index += 1;
    }

    blended_mask = blended_mask.join("")

    console.log("blended_mask: ", blended_mask)
    
}



const result = diff({
    left:   "Once upon a time in a world called World there stoof a world that was red",
    right:  "Once there was a world called World there stood a world that was red",
})