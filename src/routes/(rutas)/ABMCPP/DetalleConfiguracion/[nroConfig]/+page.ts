/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		nroConfig: params.nroConfig
	};
}