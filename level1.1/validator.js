const validate = {
    email: (text) => {
        let regexp = /^[0-9a-z][0-9a-z+\-.]{1,19}@[a-z0-9.!$%&’*+\/=?^_\-]{1,15}\.[a-z]{1,5}$/i
        return regexp.test(text)
    },
    phone: (text) => {
        let regexp = /^(\+[0-9]{1,3})?[ \-]*?(\(?[0-9 \-]{3,6}\)?)([0-9 \-]{7,15})$/
        let redactedText = text.replaceAll('-', '').replaceAll(' ', '')
            .replaceAll('(', '').replaceAll(')', '').replaceAll('+', '')
        if (redactedText.length === 10 || redactedText.length === 12) {
            return regexp.test(text)
        }
    },
    pass: (text) => {
        let regexp = /^[A-Za-z0-9_]{8,}/
        let checkNumber, checkUpLetter, checkLowLetter
        for (let i = 0; i < text.length; i++) {
            for (let k = 0; k < 26; k++) {
                if (String.fromCharCode(65 + k) === text[i]) checkUpLetter = true
                if (String.fromCharCode(97 + k) === text[i]) checkLowLetter = true
                if (k === Number(text[i]) && k < 10) checkNumber = true
                if (checkNumber && checkUpLetter && checkLowLetter) break
            }
            if (checkNumber && checkUpLetter && checkLowLetter) break
        }
        if (checkNumber && checkUpLetter && checkLowLetter) return regexp.test(text)
    }
}
const emails = 'fi@secondpart.end\n' +
    'first-part@.se=cond%p.art.end\n' +
    'first.part@se=cond%part.r\n' +
    'f@secondart.end,\n' +
    'first-part@.se=cond@part.end\n' +
    '-firstpart@.se=cond%.enddeded\n' +
    'firs_tpart@.se.en\n' +
    'firstpart@.se.enddeded'
const phones = '+38 (099) 567 8901\n' +
    '+38 099 5 6 7 8 9  01\n' +
    '(09-9) 567-890-1\n' +
    '--  (099) 567 890-1\n' +
    '+38 (099) 567 8901 0\n' +
    '+38 099 a0000000\n' +
    '+38 (0989) 567 8901\n' +
    '+48 (0989) 567 8901'
const passwords = 'C00l_Pass\n' +
    'SupperPas1\n' +
    'Cool_pass\n' +
    'C00l'
let arr = []
const temp = emails.split('\n')
const temp1 = phones.split('\n')
const temp2 = passwords.split('\n')
for (let i = 0; i < temp2.length; i++){
    arr[i] = 0
    if (validate.pass(temp2[i])) arr[i]++
}
console.log(arr);