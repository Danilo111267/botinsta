const https = require("https");
const { parse } = require("node-html-parser");

const RSS_URL = "https://rss.app/feeds/GyPL34tb7WUZpcKV.xml";
const WEBHOOK = process.env.WEBHOOK; // vamos usar secret

let ultimoLink = null;

// buscar RSS
function fetchRSS(url, callback) {
  https.get(url, res => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => callback(data));
  });
}

// enviar ao Discord
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

// loop
function checar() {
  fetchRSS(RSS_URL, xml => {
    const match = xml.match(/<link>(https:\/\/www\.instagram\.com\/[^<]+)<\/link>/);

    if (!match) return;

    const link = match[1];

    if (link !== ultimoLink) {
      ultimoLink = link;
      enviar(link);
      console.log("Novo post:", link);
    }
  });
}

// checa a cada 5 minutos
setInterval(checar, 5 * 60 * 1000);
checar();



