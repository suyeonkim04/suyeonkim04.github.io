export async function handler(event, context) {
    const { q } = event.queryStringParameters;
    if (!q) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing query parameter `q`" }),
      };
    }
  
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&extratags=1&limit=5&q=${encodeURIComponent(q)}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "eclipse-visualizer (suyeon.kim@cooper.edu)",
        }
      });
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch from Nominatim" }),
      };
    }
  }
  