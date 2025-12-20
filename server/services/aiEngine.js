import axios from "axios";

const HF_MODEL =
  "cardiffnlp/twitter-roberta-base-sentiment-latest";

export async function analyzeTextAI(text) {
  try {
    const cleanedText = text
      .replace(/\n/g, " ")
      .replace(/[^\w\s.,!?]/g, "")
      .slice(0, 256);

    const response = await axios.post(
      `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`,
      { inputs: cleanedText },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 25000
      }
    );

    let predictions = response.data;

    // 🔥 FIX: unwrap nested array
    if (Array.isArray(predictions) && Array.isArray(predictions[0])) {
      predictions = predictions[0];
    }

    if (
      Array.isArray(predictions) &&
      predictions.length > 0
    ) {
      const top = predictions.reduce((a, b) =>
        a.score > b.score ? a : b
      );

      return {
        label: String(top.label).toUpperCase(),
        score: Math.round(Number(top.score) * 100)
      };
    }

    console.warn("HF returned unexpected data:", response.data);
    return { label: "UNAVAILABLE", score: 0 };

  } catch (err) {
    console.warn(
      "HF AI timeout or error – falling back:",
      err.response?.data || err.message
    );
    return { label: "UNAVAILABLE", score: 0 };
  }
}
