import { groq } from '@nuxtjs/sanity'

// by uid

export const aboutArgentina = groq`*[_type == "argentina" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	_updatedAt,
	description,
	"uid": uid.current,
	content[] {
    ...,
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
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
export const service = groq`*[_type == "service" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	_updatedAt,
	description,
	"uid": uid.current,
	content[] {
    ...,
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
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
export const tourism = groq`*[_type == "tourism" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	_updatedAt,
	description,
	"uid": uid.current,
	content[] {
    ...,
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
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
export const migration = groq`*[_type == "migration" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	_updatedAt,
	description,
	"uid": uid.current,
	content[] {
    ...,
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
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
export const article = groq`*[_type == "article" && uid.current == $uid][0] {
	title, 
	"poster": poster.asset._ref, 
	_updatedAt,
	description,
	"uid": uid.current,
	content[] {
    ...,
		_type == "imageText" => {
			...,
			text[] {  
				_type == "blockContent" => {  ..., '_type': 'block' }
			},
			"poster": poster.asset._ref,
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

export const menu = groq`*[_type in ["page", "argentina", "service", "article", "migration", "tourism"] ]{
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
