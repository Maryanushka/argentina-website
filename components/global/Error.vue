<template>
	<div class="error h-80">
		<img src="/scenic-road-in-northern-argentina-2021-08-26-18-12-08-utc.jpg" alt="" class="w-full h-full absolute" />
		<div class="container px-4 py-12">
			<h1 class="md:text-8xl text-white text-4xl font-bold text-center">404</h1>
			<h2 class="text-white mt-8 font-bold text-center">{{ $t('pages.f0f.not_found') }}</h2>
			<n-link :to="'/'" class="text-white flex ml-auto hover:bg-yellow mr-auto bg-blue px-8 py-4 mt-6">{{ $t('pages.f0f.gotohome') }}</n-link>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.error {
	img {
		z-index: -1;
		filter: brightness(0.6);
		object-fit: cover;
		display: block;
		object-position: bottom;
	}
	a {
		width: fit-content;
	}
}
</style>
