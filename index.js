const https = require("https");

const RSS_URL = "https://rss.app/feeds/GyPL34tb7WUZpcKV.xml";
const WEBHOOK = "https://discord.comhttps://discord.com/api/webhooks/1458253167006449735/sCQAazha2aHfsp_cn7SugrfOwGVtny9EfNa6YrBzlMI2yEex1M6iMpuxaKTOw7tzLNyT/api/webhooks/SEU_WEBHOOK";

let ultimoLink = null;

function fetchRSS(url, callback) {
  https.get(url, res => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => callback(data));
  });
}

function enviar(link) {
  const convertido = link.replace(
    "https://www.instagram.com",
    "https://www.kkinstagram.com"
  );

  const payload = JSON.stringify({
    content: "kk " + convertido
  });

  const req = https.request(WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload)
    }
  });

  req.write(payload);
  req.end();
}

function checar() {
  fetchRSS(RSS_URL, xml => {
    const matches = [...xml.matchAll(
      /<link>(https:\/\/www\.instagram\.com\/[^<]+)<\/link>/g
    )];

    if (matches.length === 0) return;

    const link = matches[matches.length - 1][1];

    if (link !== ultimoLink) {
      ultimoLink = link;
      enviar(link);
      console.log("Novo post:", link);
    }
  });
}

setInterval(checar, 5 * 60 * 1000);
checar();
