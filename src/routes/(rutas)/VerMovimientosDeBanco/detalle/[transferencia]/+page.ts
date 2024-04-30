/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		transferencia: params.transferencia
	};
}