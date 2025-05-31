const input = document.getElementById("input");
const submit = document.getElementById("submit");
const loader = document.getElementById("loader");
const result = document.getElementById("result");

submit.addEventListener("click", async () => {
  const question = input.value.trim();
  if (!question) return;

  loader.classList.remove("hidden");
  result.classList.add("hidden");

  try {
    const response = await fetch("/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    result.innerHTML = `<p><strong>AI:</strong> ${data.reply}</p>`;
  } catch (error) {
    result.innerHTML = `<p>Error: ${error.message}</p>`;
  }

  loader.classList.add("hidden");
  result.classList.remove("hidden");
});
