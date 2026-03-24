// Test with the new OPENROUTER_API key from .env.local
const NEW_KEY = "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";

async function test(model) {
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NEW_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages: [{ role: "user", content: "Say hello in one sentence." }] })
  });
  const text = await r.text();
  console.log(`\n[${model}] => ${r.status}`, text.slice(0, 200));
}

(async () => {
  // Test models known to be available
  await test("google/gemma-3-27b-it:free");
  await test("nvidia/nemotron-3-super-120b-a12b:free");
  await test("nousresearch/hermes-3-llama-3.1-405b:free");
})();
