<template>
	<main class="mt-36">
		<Slider :list="sliderList" type="image" />
		<ServiceCardsList :data="services" />
	</main>
</template>

<script>
export default {
	name: 'IndexPage',
	data: () => ({
		sliderList: [{ key: 'asvawvvcaewf' }, { key: 'sgsrghyjs' }, { key: 'dfbdbdfb' }],
		services: {
			title: 'Наші послуги',
			richtext: 'Our transportation company has been offering a vast set of reliable solutions for businesses and individuals all over the world since our establishment.',
			links: [
				{
					image: 'vineyards-at-mendoza-mendoza-province-argentina-2022-03-08-22-40-07-utc.jpg',
					uid: 'pro-argentuny',
					title: 'Про Аргентину',
				},
				{
					image: 'universty.jpg',
					uid: 'migraciija',
					title: 'Іміграція',
				},
				{
					image: 'perito-moreno-glacier-in-patagonia-argentina-2021-09-01-23-40-02-utc.jpg',
					uid: 'tyruzm',
					title: 'Туризм',
				},
				{
					image: 'visa-application-form-on-a-wooden-table-visa-proc-2021-12-09-20-21-32-utc.jpg',
					uid: 'poslygu',
					title: 'Послуги',
				},
			],
		},
	}),
}
</script>
