import bcrypt from 'bcrypt'

export const passwordCrypt = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

export const passwordCompare = async (plainPass, hash, callback) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, hash, (err, isPasswordMatch) => {
            if (err) {
                reject(err)
            }
            resolve(isPasswordMatch)
        })
    })
}
