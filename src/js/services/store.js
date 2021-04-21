export const setStore = (key, data) => {
	return localStorage.setItem(key, JSON.stringify(data))
}

export const getStore = (key) => {
	return  localStorage[key] ? JSON.parse(localStorage.getItem(key)) : []
}
