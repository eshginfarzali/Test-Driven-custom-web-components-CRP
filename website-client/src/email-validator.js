/* eslint-disable */
export  function validate(email) {
	const VALID_EMAIL_ENDINGS = ["gmail.com", "outlook.com", "yandex.ru"];
  
	for (const e of VALID_EMAIL_ENDINGS) {
	  if (email.endsWith(e)) {
			return true;
	  }
	}
  
	return false;
}

  
export  function validateAsync(email) {
	new Promise(resolve => process.nextTick(resolve)); // Simulate asynchronous behavior
  
	const isValid = validate(email);
	return isValid;
  }
  
  
  
export function validateWithThrow(email) {
	if (!validate(email)) {
	  throw new Error("Invalid email");
	}
	return true;
}
  

  
export function validateWithLog(email) {
	const isValid = validate(email);
	console.log(`Email "${email}" validation result: ${isValid}`);
	return isValid;
}
  
