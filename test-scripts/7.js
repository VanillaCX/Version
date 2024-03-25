const {Schema, ShortText, LongText} = require("@VanillaCX/Schema")

const db_matter = {
    "paul": {
        "meta": {
            type: "singular",
            name: "paul",
            model: "project",
            "created" : 1708604217879,
            "author" : "lee001",
            "default": "0001"
        },
        "original": "matterdata-0001",
        "transfomations": ["matterdata-0002", "matterdata-0003"]
    }
}



const db_matter_data = {
	"id" : "matterdata-0001",
	"meta" : {
		"name" : "Main"
	},
	"release" : {
		"name" : "Clouds",
		"title" : "White Ones",
		"subtitle" : "Lots of them",
		"description" : "URL to image"
	},
	"draft" : {
		"name" : "Clouds",
		"title" : "White Ones",
		"subtitle" : "Lots of them",
		"description" : "URL to image"
	},
    "iterations": [
        {
            "meta": {
                "author": "me",
                "created": 1708604217879
            },
            "changes": {
                "name" : "Clouds",
            }
        },{
            "meta": {
                "author": "me",
                "created": 1708604217879
            },
            "changes": {
                "description" : {
                    "type": "DIFF",
                    "diff": {
                        "0": {"action": "INSERT", "chunk": "Hey, there. How are you ?"},
                        "3": {"action": "DELETE"},
                    }
                },
            }
        }
    ]
}

class Meta {
    #tags;

    constructor({tags = {}} = {}){
        this.#tags = tags
    }

    get tags (){
        return this.#tags
    }

    set (key, value){
        this.#tags[key] = value
    }

    get (key, value){
        this.#tags[key] = value
    }
}


const testTags = new Meta({tags: {tag1: "Hey"}})
testTags.tags.tag1 = "change"
testTags.tags.tag2 = "changed"
console.log("testTags.tags.tag1:", testTags.tags.tag1)
console.log("testTags.tags.tag2:", testTags.tags.tag2)

class Matter {
    constructor({meta = {}, original = [], transfomations = []} = {}){
        this.meta = new Meta()
        this.versions = new Versions({original, transfomations})
    }

    static open({id, name, model} = {}) {
        const matter = db_matter[id];

        return new Matter(matter)
    }
}

class Version {
    #id;
    #release;
    #draft;

    constructor({id, meta, release, draft, iterations} = {}){
        this.#id = id
        this.meta = new Meta({tags: meta})
        this.#release = release
        this.#draft = draft
    }

    get id(){
        return this.#id;
    }

    get release(){
        return this.#release
    }

    get draft(){
        return this.#draft
    }

    static open(id){
        const data = db_matter_data[id]

        return new Version(data)
    }
}

class Versions {
    #original;
    #transformations;

    constructor({original, transfomations} = {}){
        this.#original = original;
        this.#transformations = transfomations;

    }

    get original(){
        return new Version(this.#original)
    }

    get transfomations(){
        return this.#transformations
    }

    getTransformationById(id){
        return new Version(id)
    }

}

const schema = new Schema({
    definition: {
        name: {type: ShortText, required: true},
        title: {type: ShortText, required: true},
        subtitle: {type: ShortText, required: true},
        description: {type: LongText}
    },
    required: true
})


const matter = Matter.open({id: "paul"})
console.group("matter = Matter.open():")
console.log("matter.versions.original:", matter.versions.original);
console.log("matter.versions.transfomations:", matter.versions.transfomations);
console.log("matter.versions.getTransformationById('matterdata-0001'):", matter.versions.getTransformationById('matterdata-0001'));
console.groupEnd()