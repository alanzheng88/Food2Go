import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {
    // Make sure required input is entered
	required: {
        rule: value => {
            return value.toString().trim();
        },
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    phoneNumber: {
    	rule: value => validator.isMobilePhone(value,'en-CA'),
    	hint: value =>(
			<span className="form-error is-visible">
                This is not a valid phone number.
            </span>	
    	)
    },
    // Make sure input is an email
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isnt a valid Email.</span>
        }
    },
    // Make sure input is only in alphabetical characters
    alpha: {
        rule: value => validator.isAlpha(value),
        hint: () => (
            <span className="form-error is-visible">
                Name should contain only letters (a-z A-Z).
            </span>
        )
	},
	// Make sure password is the same and more than 6 characters long
    password: {
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;
            if (!isBothUsed || !isBothChanged) {
                return true;
            }
			
            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible"> Passwords should be the same.</span>
    },
	passwordLength: {
		rule: value => validator.isLength(value, '7'),
		hint: () => (
			<span className="form-error is-visible"> Password must be length 7 or greater.</span>
		)
	}
});