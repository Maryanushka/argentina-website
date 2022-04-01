<template>
	<footer class="bg-gray-200">
		<div class="container flex flex-wrap pt-16 pb-16 px-4">
			<div class="w-full md:w-2/3">
				<ul class="list mb-16 flex flex-wrap">
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
			<div class="w-full md:w-1/3 mt-12 md:mt-0">
				<h4 class="text-darkBlue font-bold text-base mb-8">Мы в социальных сетях</h4>
				<ul class="social-media flex mb-8">
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
