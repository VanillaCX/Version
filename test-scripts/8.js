console.log("Proxy()");



const data = {
    title: "My Title",
    subtitle: "My Subtitle",
    meta: {
        "created": 198798798798,
        "author": "Lee"
    }
}

const matterTrap = {
    get(target, prop){
        if (target[prop]) {
            return target[prop]
        } else {
            // Handle Case when property doesnt exist
        }
    },
    
    deleteProperty(target, key) {
        if (!(key in target)) {
          return false;
        }
        console.log("ITS BEEN DELETED");
        return delete target[key];
      },
    
    set(target, key, value) {
        console.log("SET VALUE");
        if (key in target) {
            console.log("Ignore request for", key, " already exists");
          return false;
        }
        return target[key] = value;
      },
      has(target, key) {
        /**
         * Trapped with:
         *  key in target
         */
        return key in target;
      },
      ownKeys(target){
        return Reflect.ownKeys(target);
        //return ["title", "subtitle"]
      }
      
    
    
}

const matter = new Proxy(data, matterTrap)

matter.title = "My Description"
console.log(matter.title)


console.log(matter.title)
console.log(matter.subtitle)


delete matter.description

console.log(matter.description)

matter.meta.type = "CREATED"

console.log("title" in matter)

const ownPropertyNames = Object.getOwnPropertyNames("matter");
console.log("ownPropertyNames:", ownPropertyNames)

Object.defineProperties(matter, {
    myProperty: {
      value: 42,
      writable: false,
    },
    property2: {},
  });


Object.defineProperty(matter, 'myProperty', {
    value: 42,
    writable: false,
});

const descriptor1 = Object.getOwnPropertyDescriptor(matter, 'myProperty');

const descriptors1 = Object.getOwnPropertyDescriptors(matter);

console.log(descriptors1.myProperty.writable);


console.log("descriptor1.writable:", descriptor1.writable);
console.log("descriptor1.value:", descriptor1.value);
console.log("matter.myProperty:", matter.myProperty);
console.log("matter:", matter, "<>");

for (const key of Object.keys(matter.meta)) {
    console.log("KEY:", key);
  }




  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

const matterTrap2 = {
    construct(target, args) {
        console.log("New Matter Opened.", args)

        return new target(...args);
    },
    get(target, prop){
        console.log("HET SOMETHING")
    }
}






  class Matter {
    #meta;

    name = "Matter Instance"
    static name = "Matter Static"

    static Proxy = new Proxy(Matter, matterTrap2)

    constructor(id, meta){
        this.#meta = meta
        this.id = id;
    }

    static open(id){
        return new Matter(id)
    }
    
  }

  
  const paul3 = Matter.open("PAUL3");



  const paul4 = new Matter.Proxy("PAUL4");

  console.log(paul3);
  console.log(paul4.name);

  console.log(Matter.Proxy.name)