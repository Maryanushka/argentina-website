import { extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'

extend('required', {
	...required,
	message: ' empty field', // the error message
})

extend('email', {
	...email,
	message: 'email not valid',
})

extend('min', {
	...min,
	message: 'number not valid',
})

// extend('regexNumber', {
// 	...regex,
// 	message: 'include number',
// })

// extend('regexCapital', {
// 	...regex,
// 	message: 'include capital letter',
// })

// extend('regexSpecialSign', {
// 	...regex,
// 	message: 'include special sign',
// })
