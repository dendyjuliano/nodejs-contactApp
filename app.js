const yargs = require("yargs")
const contacts = require("./contacts")

// mengambil argumen dari command line
yargs.command({
    command: 'add',
    describe: 'Menambahkan conbact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        nomor: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.nomor)
    }
}).demandCommand()

// menampilkan daftar semua nama & nomor contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & nomor contact',
    handler() {
        contacts.listContact()
    }
})

// menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama)
    }
})

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.nama)
    }
})

yargs.parse()


















// const contacts = require('./contacts')

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukan Nama anda : ')
//     const email = await contacts.tulisPertanyaan('Masukan Email anda : ')
//     const nomor = await contacts.tulisPertanyaan('Masukan nomor anda : ')

//     contacts.simpanContact(nama, email, nomor)
// }

// main()
