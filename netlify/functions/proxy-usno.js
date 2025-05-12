export async function handler(event, context) {
    const { lat, lon, date } = event.queryStringParameters;
  
    const url = `https://aa.usno.navy.mil/api/eclipses/solar/date?date=${date}&coords=${lat},${lon}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
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
        body: JSON.stringify({ error: "Failed to fetch from USNO" })
      };
    }
  }