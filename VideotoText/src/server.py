from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from src.video.video_processor import download_video
from src.audio.transcriber import transcribe_audio
from src.text.timestamp import extract_text_by_timestamps
from src.text.summarizer import summarize_text

app = Flask(__name__, static_folder='ui', static_url_path='')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        video_url = data.get('videoUrl')
        start_time = data.get('startTime', '00:00:00')
        end_time = data.get('endTime', '00:05:00')

        # Download video
        download_video(video_url)

        # Transcribe audio
        transcript = transcribe_audio('downloaded_audio.wav')

        # Extract relevant text
        relevant_text = extract_text_by_timestamps(transcript, start_time, end_time)

        # Generate summary
        summary = summarize_text(relevant_text)

        # Clean up temporary files
        if os.path.exists('downloaded_audio.wav'):
            os.remove('downloaded_audio.wav')
        if os.path.exists('downloaded_audio.flac'):
            os.remove('downloaded_audio.flac')

        return jsonify({
            'success': True,
            'summary': summary
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 