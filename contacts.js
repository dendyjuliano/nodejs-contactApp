const fs = require('fs');
const chalk = require('chalk')
const validator = require('validator')

//membuat folder data jiga belum ada
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

//membuat file contacts.json jika tidak ada
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const data = JSON.parse(file)
    return data
}

const simpanContact = (nama, email, nomor) => {
    const contact = { nama, email, nomor }
    // const file = fs.readFileSync('data/contacts.json', 'utf-8')
    // const data = JSON.parse(file)
    const data = loadContact()

    // cek duplikat
    const duplikat = data.find((contact) => contact.nama == nama)
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar'))
        return false
    }

    //cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid'))
            return false
        }
    }

    //cek nomor hp
    if (!validator.isMobilePhone(nomor, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Nomor HP tidak valid'))
        return false
    }



    data.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(data))
    console.log(chalk.green.inverse.bold('Terimakasih'))
}

const listContact = () => {
    const data = loadContact()
    console.log(chalk.cyan.bold('Daftar Contact'))
    data.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.nomor}`)
    })
}

const detailContact = (nama) => {
    const data = loadContact()
    const contact = data.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if (!contact) {
        console.log(chalk.red.bold(`${nama} tidak ditemukan`))
        return false
    }

    console.log(chalk.cyan.bold(contact.nama))
    console.log(chalk.cyan.bold(contact.nomor))
    if (contact.email) {
        console.log(chalk.cyan.bold(contact.email))
    }
}

const deleteContact = (nama) => {
    const data = loadContact()
    const newData = data.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    if (data.length === newData.length) {
        console.log(chalk.red.bold(`${nama} tidak ditemukan`))
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newData))
    console.log(chalk.green.bold(`${nama} berhasil dihapus`))

}

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact,
}