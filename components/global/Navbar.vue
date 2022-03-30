<template>
	<header class="header overflow-x-hidden">
		<div class="container flex">
			<div class="logo relative w-1/4">
				<n-link to="/" class="absolute z-10 h-full flex">
					<nuxt-img src="logo_cut.png" />
				</n-link>
			</div>
			<div class="flex flex-col w-3/4 items-end">
				<div class="info flex justify-end items-center w-full px-4 py-4">
					<a class="my-4 ml-12 hover:text-blue" href="emailto:info@demolink.org">
						<font-awesome-icon class="text-blue" :icon="['far', 'envelope']" />
						<span class="ml-2 font-light text-sm">info@demolink.org</span>
					</a>
					<span class="schedule my-4 ml-12">
						<font-awesome-icon class="text-blue" :icon="['far', 'clock']" />
						<span class="ml-2 font-light text-sm">Mon–Sat: 7:00–19:00</span>
					</span>
					<a class="my-4 ml-12 hover:text-blue" href="tel:1-800-1234-567">
						<font-awesome-icon class="text-blue" :icon="['fa', 'phone']" />
						<span class="ml-2 font-light text-sm">1-800-1234-567</span>
					</a>
				</div>
				<nav class="flex justify-end items-center w-full relative">
					<ul class="flex justify-items-end items-center py-4 divide-x divide-solid divide-gray-100 divide-opacity-50">
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Почему Аргентина</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Иммиграция</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Услуги</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Туризм </a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Блог</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Контакты</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.header {
	.logo {
		&::after {
			position: absolute;
			width: 150%;
			height: 83%;
			display: block;
			content: '';
			left: -50%;
			clip-path: polygon(0 0, 100% 0, 84% 100%, 0% 100%);
			background-color: theme('colors.blue');
		}
		img {
			height: auto;
			position: relative;
			width: 70%;
			object-fit: contain;
			object-position: 0 32%;
			filter: drop-shadow(0 0 20px hsl(221deg 51% 18% / 61%));
		}
	}
	nav {
		&::after {
			position: absolute;
			width: 150%;
			height: 100%;
			z-index: -1;
			display: block;
			content: '';
			right: -44%;
			clip-path: polygon(2.4% 0%, 100% 0, 100% 100%, 0% 100%);
			background-color: theme('colors.blue');
		}
	}
}
</style>
