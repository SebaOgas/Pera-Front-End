/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		idBanco: params.idBanco
	};
}