/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight request (OPTIONS method)
		if (request.method === 'OPTIONS') {
			return new Response('ok', {
				status: 200,
				headers: corsHeaders,
			});
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ message: 'Request not allowed!' }), {
				status: 405,
				headers: corsHeaders,
			});
		}

		try {
			const { email } = (await request.json()) as { email?: string };

			if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
				return new Response(JSON.stringify({ message: 'Invalid email' }), {
					status: 400,
					headers: corsHeaders,
				});
			}

			const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-key': env.BREVO_API_KEY,
				},
				body: JSON.stringify({
					email,
					listIds: [parseInt(env.LIST_ID)], // Example: [2]
					updateEnabled: true,
				}),
			});

			if (!brevoResponse.ok) {
				const error = await brevoResponse.text();
				return new Response(JSON.stringify({ message: `Brevo error: ${error}` }), { status: 500, headers: corsHeaders });
			}

			return new Response(JSON.stringify({ message: 'success' }), { status: 200, headers: corsHeaders });
		} catch (error) {
			return new Response(JSON.stringify({ message: 'Invalid Request' }), {
				status: 400,
				headers: corsHeaders,
			});
		}
	},
} satisfies ExportedHandler<Env>;
