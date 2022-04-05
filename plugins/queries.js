import { groq } from '@nuxtjs/sanity'

// by uid
export const panel = groq`*[_type == "panel" && uid.current == $uid][0]{
	title,
	"poster": poster.asset._ref,
	content[] {
		_type == 'image' => {
			_key, _type, "image": asset._ref, w, 
		},
		_type == 'richText' => {...},
		_type == 'cta' => {...},
		_type == 'counter' => {
			...,
			counterItems[] {
				title,number
			}
		},
		_type == 'benefits' => {
			...,
			benefitItems[] {
			description, title
			}
		},
		_type == 'faq' => {
			...,
			faqItems[] {
			_key, 
			question,
			answer
			}
		},
		_type == 'slider_projects' => {
			...,
			projectItems[] {
				projectItem -> {
					"uid": uid.current, 
					_id, 
					title, 
					filter,
					"poster": poster.asset._ref
				},
			}, 
		},
		_type == 'slider_panel' => {
			...,
			panelItems[] {
				panelItem -> {
					"uid": uid.current, 
					_id, 
					title, 
					description, 
					"poster": poster.asset._ref
				},
			}, 
		},
		_type == 'youtube' => { 
			...,
			"preview" : preview.asset._ref
		},
		_type == 'panelImages' => {
			_key, 
			_type, 
			title, 
			"galleryProperty": galleryProperty[0].value,
			imageItem[] {
				"image": asset._ref, 
			},
		},
    },
	metaTags{
		title,
		description,
		"image": image.asset._ref
	},
}`
export const project = groq`*[_type == "project" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	"gallery": gallery[].asset._ref, 
	_updatedAt,
	description,
	_type == 'youtube' => { 
		...,
		"preview" : preview.asset._ref
	},
	_id,
	metaTags {
		title,
		description,
		"image": image.asset._ref
	},
}`
export const page = groq`*[_type == "page" && uid.current == $uid][0] {
	content[] {
	_type == 'sliderImage' => {
			...,
			list[] {
				...,
				imageItem[] {
					_type == "mobile" => {
						_key,
						"type": _type,
						"image": asset._ref 
					},
					_type == "desktop" => {
						_key,
						"type": _type,
						"image": asset._ref
					},
				},
			},
		},
		_type == 'serviceList' => {
			...,
			list[] -> {
        "uid": uid.current, 
					_id, 
					title, 
					"poster": poster.asset._ref
			}, 
		},
		_type == 'benefits' => {...},
		_type == 'intro' => {
			...,
    	title,
	    "poster": poster.asset._ref,
		},

	},
	metaTags {
		title,
		description,
		"image": image.asset._ref
	},
}`

// list
export const panelList = groq`*[_type == "panel"]{
	title,
	"poster": poster.asset._ref,
	"uid": uid.current,
	_id,
	_updatedAt
}`
export const projectsList = groq`*[_type == "project"] | order(_updatedAt desc) {
	"uid": uid.current, 
	title, 
	"poster": poster.asset._ref, 
	"tags": tags[].value,
}`

export const sitemapData = groq`*[_type in ["project", "panel", "page"]] {"uid": uid.current, "type":  _type, "updated": _updatedAt}`

export const menu = groq`*[_type in ["page", "argentina"] ]{
	title,
	"type": _type,
	"place": place,
  "lang": __i18n_lang,
	"uid": uid.current,
  	__i18n_lang != 'ua'  => {
			'languages': [
				{
			'lang': __i18n_base -> __i18n_lang,
			'uid': __i18n_base -> uid.current,
				},
				...
				__i18n_base -> __i18n_refs[] -> {'lang': __i18n_lang,'uid':uid.current}, 
			]  
    },
  __i18n_lang == 'ua' => {
			'languages': [
        {
         'lang': __i18n_lang,
         'uid':uid.current,
      },
      ...
      __i18n_refs[] -> {'lang': __i18n_lang,'uid':uid.current}
    ],
  },
}`
