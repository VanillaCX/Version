const { ShortText, DataTypes } = require("@VanillaCX/Schema")
const {Schema} = require("@VanillaCX/Schema")

console.log("test-script-1 running...");


const db_releases = {
    "10000001": {
        "meta": {},
        "latest": {
            title: "Paul McCartney",
            subtitle: "A Beatle",
            description: "Here is a description of my stuff"
        },
        "preview": {
            title: "Paul McCartney",
            subtitle: "A Beatle",
            description: "Here is a description of my stuff"
        },
        "iterations": [
            {
                document: {
                    title: "Paul McCartney",
                    subtitle: "A Beatle",
                    description: "TBD"
                },
                meta: {
                    created: 1709031626250,
                    author: "user_id"
                }
            },
            {
                document: {
                    description: "A brilliant musician"
                },
                meta: {
                    created: 1709031696250,
                    author: "user_id"
                }
            }
        ]
    },
    "10000002": {
        "meta": {},
        "latest": {
            title: "Paul McCartney",
            subtitle: "A Beatle",
            description: "Here is a description of my stuff"
        },
        "preview": {
            title: "Paul McCartney",
            subtitle: "A Beatle",
            description: "Here is a description of my stuff"
        },
        "iterations": [
            {
                document: {
                    title: "Paul McCartney",
                    subtitle: "A Beatle",
                    description: "TBD"
                },
                meta: {
                    created: 1709031626250,
                    author: "user_id"
                }
            },
            {
                document: {
                    description: "A brilliant musician"
                },
                meta: {
                    created: 1709031696250,
                    author: "user_id"
                }
            }
        ]
    },
    "10000003": {
        "meta": {},
        "latest": {
            title: "Paul McCartney",
            subtitle: "A Beatle",
            description: "Here is a description of my stuff"
        },
        "preview": {
            title: "Paul McCartney",
            subtitle: "A Beatle",
            description: "Here is a description of my stuff"
        },
        "iterations": [
            {
                document: {
                    title: "Paul McCartney",
                    subtitle: "A Beatle",
                    description: "TBD"
                },
                meta: {
                    created: 1709031626250,
                    author: "user_id"
                }
            },
            {
                document: {
                    description: "A brilliant musician"
                },
                meta: {
                    created: 1709031696250,
                    author: "user_id"
                }
            }
        ]
    }
}

const db_object = {
    "meta": {
        "name": "paul",
        "type": "json",
        "stable": "10000001"
    },
    "schema": {
        "definition": {
            "title": { "type": "ShortText" },
            "subtitle": { "type": "ShortText" },
            "description": { "type": "ShortText" }
        },
        "required": false,
        "type": "Schema"
    },
    "releases": [
        "10000001",
        "10000002",
        "10000003",
    ],
    
}


class Version {
    constructor({meta, schema, releases} = {}){
        this.meta = meta
        this.releases = releases

        // Update Schema with a function that does this
        schema = ((schema) => {
                    return Schema.parse(JSON.stringify(schema))
                })(schema)

        this.schema = new Schema({...schema})

    }

    static open(id){
        const dataBaseLoad = db_object;
        return new Version({...dataBaseLoad})
    }

    get stableRelease (){
        const id = this.meta.stable;

        return Release.open(id)
    }

    get latestRelease (){
        const id = this.releases[this.releases.length - 1];

        return Release.open(id)
    }

    getReleaseById(id){
        return Release.open(id)
    }
}

class Release {
    #meta;
    #latest;
    #preview;

    constructor({meta, latest, preview}){
        this.#meta = meta
        this.#latest = latest
        this.#preview = preview
    }

    static open(id){
        const DB = db_releases[id]
        return new Release({...DB})
    }



    get latest(){
        return this.#latest
    }

    get preview(){
        return this.#preview
    }
}






const version = Version.open("98798798798798798787")

const latest = version.latestRelease

console.log(latest.preview)