import moment from 'moment'
import { API_HOST, TOKEN_KEY, USER_KEY, EXPRIRE_KEY } from '../../config/utils';
import { cache } from './cache'

namespace main {
	const TOKEN_ADVANCE_SECENDS = 60

	namespace tokenN {
		interface TokenInitParam {
			token?: string
			user?: server.user.DToken,// 登录用户类型
			expire?: string
		}
		export function init(info?: (param: TokenInitParam) => any) {
			Promise.all([
				cache.getItem(TOKEN_KEY),
				cache.getItem(USER_KEY),
				cache.getItem(EXPRIRE_KEY),
			]).then(([token, user, expire]) => {
				//到期时间处理
				if (expire && user && token) {
					//计算时间差
					let diff = moment(expire).diff(moment(), 'second')
					if (diff > TOKEN_ADVANCE_SECENDS) {
						//返回信息
						info && info({ token, user, expire })
						return
					}
				}
				//不满足任何条件直接返回空
				info && info({})
			})
		}
	}

	//ajax处理
	namespace ajaxN {
		//為array增加includes函數
		if (!Array.prototype.includes) Array.prototype.includes = function (elem: any): boolean {
			for (let i = 0; i < this.length; i++) {
				if (this[i] === elem) return true
			}
			return false
		}

		let tokenInfo = {
			token: null as null | string,
			expire: null as null | string,
		}
		let onTokenExpiredFunc: () => any

		/**
		 * 设置token
		 * @param _token token，如果传null则清除token
		 */
		export function setToken(token: string, expire: string): void {
			tokenInfo.token = token
			tokenInfo.expire = expire
		}

		/**
		 * 
		 */
		export function onTokenExpired(cb: () => any) {
			onTokenExpiredFunc = cb
		}

		//获取token，这里面会对过期时间进行计算已保证是正确的token
		function getToken(): string | null {
			let { token, expire } = tokenInfo
			//保证有token
			if (!token || !expire) return null
			//保证没有过期
			if (moment(expire).diff(moment(), 'seconds') <= TOKEN_ADVANCE_SECENDS) {
				//调用过期事件处理
				if (onTokenExpiredFunc) onTokenExpiredFunc()
				//返回空
				return null
			}
			//得到token
			return token
		}

		//base64操作类
		export class Base64File {

			public base64: string
			public filename: string
			public blob: Blob

			constructor(base64: string, filename: string) {
				this.base64 = base64;
				this.filename = filename;
				this.blob = this.getBlobFromBase64(base64);
			}

			private getBlobFromBase64(b64: string) {
				if (b64.indexOf('data:') == 0)
					b64 = b64.substring('data:'.length);
				let str = b64.substring(b64.indexOf(',') + 1);
				let index = b64.indexOf(';');
				let type = (index >= 0) ? b64.substring(0, index) : 'application/octet-stream';
				let binary = atob(str);
				let array = [];
				for (let i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], { type: type });
			}
		}

		//数据转换
		class QueryParser {
			public static readonly parser = new QueryParser()
			private constructor() { }
			/**
			 * 格式化一个对象。
			 * 格式化过程就是讲对象转换成querystring的每个部分，并以{k:strinng, v:string|number|boolean}的形式返回
			 */
			public parse(obj: any, _path?: string, _deepth?: number): Array<{ k: string, v: any }> {
				let path = _path || ''
				let deepth = _deepth || 0;
				obj = (obj === null || obj === undefined) ? '' : obj
				let buffer: Array<{ k: string, v: any }> = [];
				//如果是ie10以上，则将input转换成FileList
				if (obj instanceof HTMLInputElement) obj = obj.files
				//文件列表转换成数字
				if (obj instanceof FileList) obj = obj.item(0)//this.fileList2Array(obj)
				//保持原样的数据
				if (
					['number', 'string', 'boolean'].indexOf(typeof obj) >= 0
					|| (obj instanceof File)
					|| obj instanceof Base64File
					|| obj instanceof HTMLInputElement
				) {
					buffer.push((deepth == 1) ? { k: path, v: obj } : { k: '[' + path + ']', v: obj })
				}
				//其他对象
				else if (typeof obj == 'object') {
					Object.keys(obj || {}).forEach(key => this.parse(obj[key], key as string, deepth + 1).forEach(o => {
						buffer.push((deepth == 1) ?
							{ k: path + o.k, v: o.v } :
							{ k: (path ? '[' + path + ']' : '') + o.k, v: o.v })
					}))
				}
				return buffer;
			}

			//将FileList对象转换成Array对象
			private fileList2Array(files: FileList) {
				let buffer = [];
				for (let i = 0; i < files.length; i++) {
					buffer.push(files.item(i));
				}
				return buffer;
			}
		}

		//ie9以上jQuery Formdata提交
		class FormDataAjax {

			private successCB: (data?: any) => any = null as any
			private errorCB: (data?: Error) => any = null as any

			constructor(private url: string, private method: string, private data: HTMLFormElement | JQuery<HTMLFormElement> | FormData | { [i: string]: any }, private ext: { [i: string]: any } = {}) {
				this.data = (data instanceof $) ? (data as JQuery<HTMLFormElement>)[0] : data
			}

			public submit() {
				//转换数据
				let parseResult: FormData | { [i: string]: any }
				//GET请求额外处理
				if (this.method.toUpperCase() == 'GET') {
					let _result: { [i: string]: any } = {}
					//处理表单数据
					if (this.data instanceof HTMLFormElement) {
						$(this.data).serializeArray().forEach(({ name, value }) => {
							if (!_result[name]) _result[name] = value
							else if (_result[name] instanceof Array) _result[name].push(value)
							else _result[name] = [_result[name], value]
						})
					}
					//formdata不处理
					else if (this.data instanceof FormData) { }
					//键值对
					else _result = this.data
					//附加数据
					_result = { ..._result, ...this.ext }
					//保存
					parseResult = _result
				}
				//其他请求方式
				else {
					let _result = (this.data instanceof FormData) ? this.data : ((this.data instanceof HTMLFormElement) ? new FormData(this.data) : this.formData(this.data))
					//加入扩展数据
					QueryParser.parser.parse(this.ext).forEach(item => (_result as FormData).append(item.k, item.v))
					parseResult = _result
				}
				//头
				let headers: { type?: string, token?: string } = { type: 'api' }
				let _token = getToken()
				if (_token !== null) headers.token = _token
				//发起ajax
				$.ajax({
					url: this.url,
					method: this.method.toUpperCase(),
					data: parseResult,
					headers,
					cache: false,
					dataType: 'json',
					...((this.method.toUpperCase() == 'GET') ? {} : {
						processData: false,
						contentType: false,
					})
				}).done(data => {
					if (data && data.err) this.errorCB && this.errorCB(data.err)
					else this.successCB && this.successCB(data)
				}).fail(xhr => {
					try {
						let result = JSON.parse(xhr.responseText)
						if (result.err) this.errorCB && this.errorCB(new Error(result.err))
						else this.errorCB && this.errorCB(new Error(xhr.statusText))
					} catch (e) {
						this.errorCB && this.errorCB(new Error(xhr.statusText))
					}
				})
			}

			//处理成功
			public onSuccess(cb: (data?: any) => any) {
				this.successCB = cb
			}

			//处理错误
			public onError(cb: (err?: Error) => any) {
				this.errorCB = cb
			}

			//构建formdata
			private formData(obj: { [i: string]: any }, _form?: HTMLFormElement): FormData {
				let form = _form || null
				//验证参数是否正确
				if (form && !(form instanceof HTMLFormElement))
					throw new Error('Format object to DromData Error, the second param should be HTMLFormElement type');
				//创建formdata
				let formData = form ? new FormData(form) : new FormData();
				//填充
				QueryParser.parser.parse(obj).forEach(o => {
					if (o.v instanceof Base64File)
						formData.append(o.k, o.v.blob, o.v.filename)
					else formData.append(o.k, o.v)
				})
				//返回
				return formData;
			}
		}

		//用于提交一个ajax请求
		function sendAjaxRequest(url: string, method: string, data: any, ext: { [i: string]: any } = {}): Promise<any> {
			return new Promise((resolve, reject) => {
				//默认url
				url = url || $(data).prop('action')
				if (!(/^https?:\/\//.test(url))) {
					url = API_HOST + url
				}
				//调用ajax
				let req = new FormDataAjax(url, method, data, ext)
				req.onSuccess(resolve)
				req.onError(reject)
				req.submit()
			})
		}

		//创建ajaxAPI
		function createAjax() {
			//请求方式
			function ajaxApi(method: string) {
				return function (url: string) {
					return function (data: any, ext: { [i: string]: any } = {}) {
						return sendAjaxRequest(url, method, data, ext)
					}
				}
			}
			return {
				get: ajaxApi('get'),
				post: ajaxApi('post'),
				put: ajaxApi('put'),
				del: ajaxApi('delete'),
				patch: ajaxApi('patch'),
			}
		}

		//创建ajax操作
		export const ajax = createAjax()

		type AjaxType = keyof typeof ajax

		//创建API
		function createApi(apiList: { [i: string]: { [i: string]: ['get' | 'post' | 'put' | 'delete' | 'patch', string] } }) {
			let api = {} as any
			const parseApi = (subApi: any, subList: any) => {
				for (let key in subList) {
					let subItem = subList[key]
					if (['get', 'post', 'put', 'delete', 'patch'].includes(subItem[0])) {
						subApi[key] = function (data: any = {}) {
							let [method, path, opt] = subItem
							let _name: AjaxType = ({ 'get': 'get', 'post': 'post', 'put': 'put', 'delete': 'del', 'patch': 'patch' } as any)[method]
							opt && opt.warn && console.warn('【调用警告】' + opt.name + ':' + opt.warn)
							return ajax[_name]('/api' + path)(data)
						}
					}
					else if (!!subItem) {
						parseApi(subApi[key] || (subApi[key] = {}), subItem)
					}
				}
			}
			parseApi(api, apiList)
			return api
		}

		//创建API
		export const api = createApi(window.__apiList)
	}


	$(window).on('load', () => {
		// 我现在要做的不过就是
		// 监听登录
		// 监听登出
		// 监听token过期
		// login
	})

	export const setToken = ajaxN.setToken

	window.ajax = ajaxN.ajax as any
	window.api = ajaxN.api
	window.Base64File = ajaxN.Base64File
}