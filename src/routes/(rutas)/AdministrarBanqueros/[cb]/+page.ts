/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		cb: params.cb
	};
}