const https = require("https");

const WEBHOOK = "https://discord.com/api/webhooks/1458253167006449735/sCQAazha2aHfsp_cn7SugrfOwGVtny9EfNa6YrBzlMI2yEex1M6iMpuxaKTOw7tzLNyT";

function enviar(link) {
  const data = JSON.stringify({
    content: "kk " + link.replace(
      "www.instagram.com",
      "www.kkinstagram.com"
    )
  });

  const req = https.request(WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  });

  req.write(data);
  req.end();
}

enviar("https://www.instagram.com/p/DTLQ_1hjdaw/");



