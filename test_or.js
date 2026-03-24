fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer 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`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [{ role: "user", content: "hello" }]
  })
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
}).catch(console.error);
