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
        "Authorization": `Bearer YOUR_OPENAI_API_KEY_HERE`
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
