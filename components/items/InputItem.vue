<template>
	<ValidationProvider v-slot="{ errors, classes }" :rules="rules" :mode="mode" tag="div" class="input_item">
		<div v-if="errors.length" class="error" :class="classes">
			{{ errors[0] }}
		</div>

		<input v-if="type === 'number'" :id="id" v-model="inputValue" v-mask="'###-###-####'" :placeholder="label" :name="id" @change="emitValue" />
		<textarea v-else-if="type === 'textarea'" :id="id" v-model="inputValue" :type="type" :placeholder="label" :name="id" @change="emitValue" />
		<input v-else :id="id" v-model="inputValue" :type="type" :placeholder="label" :name="id" @change="emitValue" />

		<label :for="id" class="input_label">{{ label }}</label>
		<div class="border"></div>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { mask } from 'vue-the-mask'

export default {
	directives: { mask },
	components: {
		ValidationProvider,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'input',
		},
		label: {
			type: String,
			default: '',
		},
		rules: {
			type: [Object, String],
			required: true,
		},
		mode: {
			type: String,
			default: 'eager',
		},
	},
	data: () => ({
		inputValue: '',
	}),
	methods: {
		emitValue() {
			this.$emit('getValue', { name: this.name, value: this.inputValue })
		},
	},
}
</script>

<style lang="scss" scoped>
.input_item {
	position: relative;

	font-weight: 500;
	textarea {
		min-height: 10rem;
		border: 1px solid theme('colors.gray.300');
	}
	input,
	textarea {
		border: 1px solid theme('colors.gray.300');
		padding: 0.8rem 1.5rem;
		width: 100%;
		background-color: transparent;

		transition: border-color 0.2s;
		outline: 1px solid theme('colors.gray.300');
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus {
			-webkit-text-fill-color: theme('colors.black');
			box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
			transition: background-color 5000s ease-in-out 0s;
		}
		&::placeholder {
			color: theme('colors.black');
			text-transform: capitalize;
			transition: 0.2s ease;
			font-weight: 300;
			letter-spacing: 1px;
		}
		&::placeholder-shown ~ label {
			font-size: 1rem;
			cursor: text;
			top: 20px;
		}
		&:focus {
			&::placeholder {
				color: theme('colors.white');
			}
			~ label {
				position: absolute;
				top: 0;
				display: block;
				transition: 0.2s;
				font-weight: 300;
				font-size: 0.8rem;
				color: theme('colors.black') t;
			}
		}
		/* reset input */
		&:required,
		&:invalid {
			box-shadow: none;
		}
	}
	.border {
		display: none;
	}
	label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s ease;
		font-weight: 300;
		font-size: 0.8rem;
		color: transparent;
		text-transform: capitalize;
	}
	.error {
		position: absolute;
		top: 0;
		right: 1.5rem;
		font-size: 0.8em;
		color: rgb(255, 0, 85);
		display: flex;
		justify-content: center;
		align-items: center;
		// @include d-flex(row, center, center, initial);
		&.invalid {
			display: flex;
		}
	}
}
.subscribe {
	.input_item {
		input {
			border-top: none;
			border-right: none;
			border-left: none;
			outline: none;
		}
	}
}
</style>
