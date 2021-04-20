export const getGoods = async (url) => {
	let res = await fetch(url)
	if (!res.ok) throw new Error('Error - ' + res.status);
	const response = await res.json()
	if (localStorage.goods) {
		return JSON.parse(localStorage.getItem('goods'))
	} else {
		localStorage.setItem('goods', JSON.stringify(response))
	}
	return await response;
}