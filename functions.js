const fs = require('fs')
const readline = require('readline');
const filepath = './data/contact.json' // inisiasi file path berdasarkan folder data/json
const exixstFolder = fs.existsSync('./data') // inisiasi cek folder data 
const exixstFile = fs.existsSync(filepath) //inisiasi cek file contact.json
const validator = require('validator');

rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
})

//membuat function check folder
    if(!exixstFolder){ //cek apakah folder data tidak ada
        fs.mkdirSync('./data', (err)=> { //membuat folder baru bernama data
            if (err) throw err
        })
    }

//membuat function check file
    if(!exixstFile){ //cek apakah folder data tidak ada
        fs.writeFileSync(filepath,'[]') //membuat file baru contact.json
    }

const saveData = (name, number, email)=> {
    const contact = {name, number, email} //inisiasi contact
    const file = fs.readFileSync(filepath,'utf-8') //membaca filepath
    const contacts = JSON.parse(file) // parsing json 

    const duplicate = contacts.find((cont) => cont.name === name)
    const duplicateEmail = contacts.find((cont) => cont.email === email)
    const duplicateNumber = contacts.find((cont) => cont.number === number)

    const valEmail = validator.isEmail(email)
    const valNumber = validator.isMobilePhone(number,'id-ID')

    if(duplicate){
        console.log('Contact Name is already recorded')
        return false
    }

    if(!email || valEmail==false || duplicateEmail){
        console.log('Email format is not valid or Contact Email is already recorded')
        return false
    }

    if(valNumber==false || duplicateNumber){
        console.log('Mobile Number format is not valid or Contact Number is already recorded')
        return false
    }
    contacts.push(contact) // push data contacts kepada contact
    fs.writeFileSync(filepath,JSON.stringify(contacts)) //membuat file contact yang sudah di konversi menjadi string
    console.log('Terimakasih sudah memasukkan data')
    rl.close()
}

const loadContact = () => {
    const file = fs.readFileSync('./data/contact.json','utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const listContact = () => {
    const contacts = loadContact()
    console.log('Contact list')
    contacts.forEach((contact,i)=>{
        console.log(`${i+1}.${contact.name} - ${contact.number}`)
    })

}

const detailContact = (name) => {
    const contacts = loadContact()
    console.log('Detail Contact')
    const detailContact = contacts.find((cont) => cont.name === name)
    console.log(`${detailContact.name}\n${detailContact.number}\n${detailContact.email}`)
}

module.exports={saveData, listContact, detailContact}