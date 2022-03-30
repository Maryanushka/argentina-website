<template>
	<footer class="bg-gray-200">
		<div class="container flex md:flex-wrap pt-16 pb-16">
			<div class="w-full md:w-1/2">
				<ul class="list mb-16 flex">
					<li>
						<a class="text-darkBlue hover:text-blue font-bold pr-8 text-base" href="">Почему Аргентина</a>
					</li>
					<li>
						<a class="text-darkBlue hover:text-blue font-bold pr-8 text-base" href="">Иммиграция</a>
					</li>
					<li>
						<a class="text-darkBlue hover:text-blue font-bold pr-8 text-base" href="">Услуги</a>
					</li>
					<li>
						<a class="text-darkBlue hover:text-blue font-bold pr-8 text-base" href="">Туризм </a>
					</li>
					<li>
						<a class="text-darkBlue hover:text-blue font-bold pr-8 text-base" href="">Блог</a>
					</li>
				</ul>
				<SubscribeForm />
			</div>
			<div class="w-full md:w-1/2">
				<h4 class="text-darkBlue font-bold text-base">Мы в социальных сетях</h4>
				<ul class="social-media flex">
					<li>
						<a href="#">
							<font-awesome-icon class="text-darkBlue hover:text-blue pr-6 text-xl" :icon="['fab', 'facebook']" />
						</a>
					</li>
					<li>
						<a href="#">
							<font-awesome-icon class="text-darkBlue hover:text-blue pr-6 text-xl" :icon="['fab', 'instagram']" />
						</a>
					</li>
					<li>
						<a href="#">
							<font-awesome-icon class="text-darkBlue hover:text-blue pr-6 text-xl" :icon="['fab', 'youtube']" />
						</a>
					</li>
				</ul>
				<span class="text-darkBlue">Domen.com © {{ getYear }} All rights reserved </span>
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	name: 'Footer',
	computed: {
		getYear() {
			const today = new Date()
			return today.getFullYear()
		},
	},
}
</script>
