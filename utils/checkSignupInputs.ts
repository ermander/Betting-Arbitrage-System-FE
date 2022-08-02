import validator from "validator"

export default function checkSignupInputs(
  email: string,
  password: string,
  repeatPassword: string
) {
  const validationResult = { status: false, message: "" }
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  if (!email || !password || !repeatPassword) {
    validationResult.message = "Devi inserire tutti i campi richiesti"
    return validationResult
  }
  if (!re.test(password)) {
    validationResult.message = `
      La tua password deve contenere da 8 a 16 caratteri, 
      deve includere almeno un numero, un carattere maiuscolo ed
      un carattere speciale (!@#$%^&*)`
    return validationResult
  }
  if (!validator.isEmail(email)) {
    validationResult.message = "Devi inserire un'email valida!"
    return validationResult
  }
  if (password !== repeatPassword) {
    validationResult.message = "Le due password non coincidono!"
    return validationResult
  }
  validationResult.status = true
  return validationResult
}
