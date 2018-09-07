
type Methods = 'push' | 'pop'

type PageElem = JSX.Element

export namespace pageStack {

	export const pages: Array<PageElem> = []
	export const cache: Array<{ type: Methods, page: PageElem }> = []
	const ANIMATION_TIME = 3000

	const listeners: Array<() => any> = []

	export function push(page: PageElem) {
		cache.push({ type: 'push', page })
		fireChange()
		setTimeout(() => {
			pages.push(cache.shift()!.page)
			fireChange()
		}, ANIMATION_TIME)
	}

	export function pop() {
		cache.push({ type: 'pop', page: pages.pop()! })
		fireChange()
		setTimeout(() => {
			cache.shift()
			fireChange()
		}, ANIMATION_TIME)
	}

	export function onPageChange(cb: () => any) {
		listeners.push(cb)
	}

	function fireChange() {
		listeners.forEach(func => func())
	}
}