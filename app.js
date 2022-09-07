const {saveData, listContact, detailContact} = require("./functions");

const yargs = require('yargs')

yargs.command({
    command: 'add',
    describe:'add new contact',
    builder:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type:'string',
        },
        number:{
            describe:'Contact Number',
            demandOption:true,
            type:'string',
        },
        email:{
            describe:'Contact Email',
            demandOption:false,
            type:'string',
        },
    },
    handler(argv){
        saveData(argv.name,argv.number,argv.email)
    }
})

yargs.command({
    command:'list',
    describe:'see contact list',
    handler(){
        listContact()
    }
})

yargs.command({
    command:'detail',
    describe:'see contact list',
    builder:{
        name:{
            describe: 'Contact Name',
            demandOption: true,
            type:'string',
        },
    },
    handler(argv){
        detailContact(argv.name)
    }
})
yargs.parse()