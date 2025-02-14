import os
import google.generativeai as genai

# Configure the API key correctly
genai.configure(api_key="AIzaSyA1dC2ELJMhsh_EG8Ku5htauWRD_SIzN8o")

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=generation_config,
)

def GenerateResponse(input_text):
    print("Generating response...")
    response = model.generate_content([
        "input: who are you",
        "output: I am Acadex's conversation chatbot. I can help you with choosing the right study materials for you to study...",
        "input: what all can you do",
        "output: I can help you with: Recommending relevant study materials based on your subject, learning style, and goals.",
        f"input: {input_text}",
        "output: ",
    ])
    print("Response generated.")
    return response.text.strip()  # Strip any leading/trailing whitespace

while True:
    user_input = input("Enter your prompt (or type 'exit' to quit): ")
    if user_input.lower() == 'exit':
        print("Exiting the chatbot. Goodbye!")
        break
    print(GenerateResponse(user_input))