import google.generativeai as genai
import os
import time
from tenacity import retry, stop_after_attempt, wait_exponential

# Configure the Gemini API
genai.configure(api_key="AIzaSyBIRELN8IiFnJwfqrfUoMdhAeAT5hCEVFs")

@retry(
    stop=stop_after_attempt(3),  # Try 3 times
    wait=wait_exponential(multiplier=1, min=4, max=10)  # Wait between attempts
)
def generate_summary_with_retry(model, text):
    return model.generate_content(f"Summarize the following text: {text}")

def summarize_text(text):
    try:
        # Break text into smaller chunks if it's too long (Gemini has a token limit)
        max_chunk_length = 2500  # characters
        if len(text) > max_chunk_length:
            chunks = [text[i:i+max_chunk_length] for i in range(0, len(text), max_chunk_length)]
            summaries = []
            
            # Initialize Gemini model
            model = genai.GenerativeModel('gemini-pro')
            
            for chunk in chunks:
                # Wait a bit between chunks to avoid rate limits
                time.sleep(2)
                response = generate_summary_with_retry(model, chunk)
                summaries.append(response.text)
            
            # Combine summaries
            final_summary = " ".join(summaries)
            return final_summary
        else:
            # For shorter text, just summarize directly
            model = genai.GenerativeModel('gemini-pro')
            response = generate_summary_with_retry(model, text)
            return response.text
            
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg:
            return "API quota exceeded. Please try again later or reduce the length of the video."
        return f"Error generating summary: {error_msg}" 