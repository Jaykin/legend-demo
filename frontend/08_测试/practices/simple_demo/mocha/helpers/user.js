class User {
    save() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
                // reject(new Error('保存用户信息出错..'))
            }, 1000)
        })
    }
}

module.exports = User