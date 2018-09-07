
namespace storageN {
	const s = require('local-storage')
	export function setItem(key: string, value: any) {
		s.set(key, value)
	}
	export function getItem(key: string) {
		return s.get(key)
	}
	export function removeItem(key: string) {
		s.remove(key)
	}
	export function clear() {
		s.clear()
	}
}

export const cache = storageN