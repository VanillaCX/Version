


class Meta {
    #tags;

    constructor(tags){
        this.#tags = tags
    }

    get tags(){
        return this.#tags
    }

    
    
}

class Versions {
    constructor({trunk, branches}){
        this.trunk = trunk;
        this.branches = branches;
    }
}


class Queries {
    constructor(){}

    static openMatter({name, model} = {}){
        return {
            meta: {
                name: "paul",
                "model": "project",
                author: "Lee",
                created: 1981981098,
            },
            versions: {
                "trunk": "matterdata-0001",
                "branches": ["matterdata-0002", "matterdata-0003"]
            }
        }
    }
}



class DataSave {
    constructor(){

    }
}

const { Query } = require("@VanillaCX/Query");

const account = process.env.SESSION_USER_ID;
const database = process.env.MATTER_DATABASE;

const modelcollection = `${account}-models`;
const editionscollection = `${account}-editions`;
const mattercollection = `${account}-matter`;

const QModels = new Query({
    database: "database-name",
    collection: "matter"
});

QModels.findOne(id)
QModels.updateOne(filter, docFrag)
QModels.insertOne(document)

class Matter {
    constructor({meta, versions}){

        const proxyMeta = new Proxy(meta, this.metaTrap)

        this.meta = new Meta(proxyMeta)
        this.versions = new Versions(versions)

        

    }

    testing = "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

    metaTrap = {
        set: function(target, prop, value, receiver) {
            // Validate Data Here
            return Reflect(...arguments)
        },
        get: function(target, prop, receiver) {
            // Is this neccessary ?
            return Reflect(...arguments)
        },
        deleteProperty: function(target, key){
            if (!(key in target)) {
                return false;
            }
            
            const deleted = delete target[key]

            if(deleted){
                // Update database
            }

            return deleted;
        }
    }

    metaTrap2 = {
        get:(target, property) => {
            console.log("this", this)
            console.log("REQUEST META: ", property)

            if (target[property]) {
                return target[property]
            } else {
                // Handle Case when property doesnt exist
                return "DOESNT_EXIST@@@@@@@@@@@"
                //return Reflect.get(...arguments)
            }

        },
        set: function(target, property, value) {
            console.log("REQUEST CHANGE META: ", property, value)

            return Reflect.set(...arguments)
        },
        deleteProperty: (target, key) => {
            console.log("TRY TO DELETE");
            if (!(key in target)) {
              return "DOESNT_EXIST";
            }
            console.log("ITS BEEN DELETED");
            return delete target[key];
          },
          has: (target, key)=> {
            console.log("CHECKING IF ", key, " EXISTS ...");
            /**
             * Trapped with:
             *  key in target
             */
            return key in target;
          },
          ownKeys:(target) => {
            return Reflect.ownKeys(target);
            //return ["title", "subtitle"]
          }
    }

    static open({name, model} = {}){
        const data = Queries.openMatter({name, model})
        return new Matter(data)
    }
}


const paul = Matter.open({name: "paul",model: "project"})

console.log(paul.meta.tags);
