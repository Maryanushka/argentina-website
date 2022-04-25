import { groq } from '@nuxtjs/sanity'

// by uid
export const article = groq`*[_type == "article" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	_updatedAt,
	description,
	"uid": uid.current,
  tags,
	content[] {
    ...,
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
		},
    _type == "titleText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
		},
  },
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
	metaTags {
		title,
		description,
		"image": image.asset._ref
	},
}`
export const page = groq`*[_type == $type && uid.current == $uid][0] {
	content[] {
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
		},
		_type == "titleText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
		},
		_type == 'cta' => {...},
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

	},
	title,
	"poster": poster.asset._ref,
	metaTags {
		title,
		description,
		"image": image.asset._ref
	},
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
export const home = groq`*[_type == "home" && uid.current == $uid][0] {
	content[] {
	_type == 'sliderImage' => {
		...,
			"type" : _type,
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
		_type == "sliderYoutube" => {
			...,
			"type" : _type,
			list[] {
				..., 
				"youtube" : youtube.url
			}
		},
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
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

	},
	title,
	"poster": poster.asset._ref,
	metaTags {
		title,
		description,
		"image": image.asset._ref
	},
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

// list
export const innerPagesList = groq`*[_type == $type && __i18n_lang == $lang]{
	title,
	"poster": poster.asset._ref,
	"uid": uid.current,
  description,
	_id,
}`
export const articleList = groq`*[_type == "article" && __i18n_lang == $lang] | order(_updatedAt desc) {
	"uid": uid.current, 
	title, 
	"poster": poster.asset._ref, 
	"tags": tags[].value,
	"updated": _updatedAt,
	description,
	_id,
}`
export const articleLatest = groq`*[_type == "article" && __i18n_lang == $lang][$from...$to] | order(_updatedAt desc) {
	"uid": uid.current, 
	title, 
	"poster": poster.asset._ref, 
	"tags": tags[].value,
	"updated": _updatedAt,
	description,
	_type,
	_id,
}`

export const sitemapData = groq`*[_type in ["project", "panel", "page"]] {"uid": uid.current, "type":  _type, "updated": _updatedAt}`

export const menu = groq`*[_type in ["page", "argentina", "service", "article", "migration", "tourism"] ]{
	title,
	"type": _type,
	"place": place,
  "lang": __i18n_lang,
	"tags": tags[].value,
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
