function VerificationCode(){
    const mycode = Math.trunc(Math.random() * 10000).toString().padStart(4, "0");

    return mycode
}

module.exports = { VerificationCode };