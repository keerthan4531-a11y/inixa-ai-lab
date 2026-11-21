// In-memory serverless cache for developer published apps
let serverPublishedApps = [];

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const url = new URL(req.url);

  // GET: Return all published apps
  if (req.method === 'GET') {
    return new Response(JSON.stringify(serverPublishedApps), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  }

  // POST: Add or update an app
  if (req.method === 'POST') {
    try {
      const app = await req.json();
      if (!app || !app.id || !app.name) {
        return new Response(JSON.stringify({ error: 'Invalid app payload' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      // Filter out duplicates
      serverPublishedApps = [app, ...serverPublishedApps.filter((a) => a.id !== app.id && a.slug !== app.slug)];

      return new Response(JSON.stringify({ success: true, count: serverPublishedApps.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  }

  // DELETE: Remove an app
  if (req.method === 'DELETE') {
    const appId = url.searchParams.get('id');
    if (appId) {
      serverPublishedApps = serverPublishedApps.filter((a) => a.id !== appId && a.slug !== appId);
    }
    return new Response(JSON.stringify({ success: true, count: serverPublishedApps.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
