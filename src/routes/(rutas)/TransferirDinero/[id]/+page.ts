/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		nroCB: params.id
	};
}