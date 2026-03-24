fetch("https://modest-mongoose-0.eu-west-1.convex.site/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] })
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
}).catch(console.error);
