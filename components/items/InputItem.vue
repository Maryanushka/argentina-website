<template>
	<ValidationProvider v-slot="{ errors, classes }" :rules="rules" :mode="mode" tag="div" class="input_item">
		<div v-if="errors.length" class="error" :class="classes">
			{{ errors[0] }}
		</div>

		<input v-if="type === 'number'" :id="id" v-model="inputValue" v-mask="'###-###-####'" :placeholder="label" :name="id" @change="emitValue" />
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
	padding: inherit;
	width: 100%;
	height: 100%;

	font-weight: 500;
	input {
		width: 100%;
		height: 50px;
		border: 0;
		// border-bottom: 1px solid $borderInput;
		outline: 0;
		padding-top: 20px;
		background: transparent;

		font-family: inherit;
		font-size: 0.9rem;
		color: $text;

		transition: border-color 0.2s;
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus {
			-webkit-text-fill-color: $text;
			box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
			transition: background-color 5000s ease-in-out 0s;
		}
		&::placeholder {
			// color: $text;
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
				// color: $white;
			}
			~ label {
				position: absolute;
				top: 0;
				display: block;
				transition: 0.2s;
				font-weight: 300;
				font-size: 0.8rem;
				// color: $text;
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
		right: 0;
		font-size: 0.8em;
		// color: $error;
		@include d-flex(row, center, center, initial);
		&.invalid {
			display: flex;
		}
	}
}
</style>
