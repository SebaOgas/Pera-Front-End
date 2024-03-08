/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		mail: params.mail
	};
}