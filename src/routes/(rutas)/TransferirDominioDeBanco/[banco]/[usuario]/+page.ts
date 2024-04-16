/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		banco: params.banco,
		usuario: params.usuario
	};
}