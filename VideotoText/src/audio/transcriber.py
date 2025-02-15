import speech_recognition as sr
from pydub import AudioSegment
import os

def convert_wav_to_flac(wav_file):
    """Convert WAV to FLAC format for better speech recognition"""
    try:
        audio = AudioSegment.from_wav(wav_file)
        flac_path = wav_file.replace('.wav', '.flac')
        audio.export(flac_path, format="flac")
        return flac_path
    except Exception as e:
        raise Exception(f"Error converting audio: {str(e)}")

def transcribe_audio(audio_file):
    try:
        # Initialize recognizer
        recognizer = sr.Recognizer()
        
        # Convert to FLAC for better recognition
        flac_file = convert_wav_to_flac(audio_file)
        
        # Adjust recognition settings
        with sr.AudioFile(flac_file) as source:
            # Adjust for ambient noise
            recognizer.adjust_for_ambient_noise(source)
            
            # Record audio data
            audio_data = recognizer.record(source)
            
            # Try different recognition services
            try:
                # Try Google Speech Recognition first
                text = recognizer.recognize_google(audio_data)
            except sr.RequestError:
                # Fallback to Sphinx (offline recognition)
                text = recognizer.recognize_sphinx(audio_data)
        
        # Clean up temporary files
        if os.path.exists(flac_file):
            os.remove(flac_file)
            
        return text
    
    except sr.UnknownValueError:
        return "Speech recognition could not understand the audio"
    except sr.RequestError as e:
        return f"Could not request results from speech recognition service; {str(e)}"
    except Exception as e:
        return f"An error occurred during transcription: {str(e)}" 