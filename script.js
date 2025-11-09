const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");

generateBtn.addEventListener("click", async () => {
  const input = document.getElementById("inputText").value.trim();
  const mode = document.getElementById("mode").value;

  if (!input) {
    resultText.innerText = "⚠️ Please enter some text first!";
    return;
  }

  resultText.innerText = "⏳ Generating response...";

  let prompt = "";
  if (mode === "summarize") {
    prompt = `Summarize the following text in simple words:\n${input}`;
  } else if (mode === "question") {
    prompt = `Answer this question clearly:\n${input}`;
  } else if (mode === "quiz") {
    prompt = `Create 5 quiz questions (with answers) based on this text:\n${input}`;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    resultText.innerText = data.choices[0].message.content.trim();

  } catch (error) {
    resultText.innerText = "❌ Error: " + error.message;
  }
});

