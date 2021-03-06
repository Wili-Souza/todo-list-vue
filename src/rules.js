import { required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
    ...required,
    message: 'The {_field_} is required'
});

extend('min', {
    validate: (value, min) => {
        return value.length >= min;
    },
    message: 'The {_field_} is too short'
});

extend('max', {
    validate: (value, max) => {
        return value.length <= max;
    },
    message: 'The {_field_} is too long'
});
