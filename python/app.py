from flask import Flask, request, jsonify
import openai
import json

app = Flask(__name__)

# ตั้งค่า API Key และ Base URL ของ OpenRouter
openai.api_base = "https://openrouter.ai/api/v1"
openai.api_key = "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"  # ใส่ API Key จริงของคุณ

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        
        response = openai.ChatCompletion.create(
            model="deepseek/deepseek-r1:free",
            messages=[
                {"role": "user", "content": user_message}
            ],
        )

        response_text = response["choices"][0]["message"]["content"]
        clean_response = response_text.replace("\n", " ").replace("\\", "").strip()

        return jsonify({
            "response": clean_response,
        })

    except json.JSONDecodeError as e:
        return jsonify({"error": f"Error decoding JSON: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
