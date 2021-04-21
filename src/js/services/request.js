import {setStore} from "./store";

export const getGoods = async (url) => {
	let res = await fetch(url)
	if (!res.ok) throw new Error('Error - ' + res.status);
	const response = await res.json()
	setStore('goods', response)
	return await response;
}