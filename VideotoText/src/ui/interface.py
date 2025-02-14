import streamlit as st
import sys
import os
from pathlib import Path
import time

# Add the project root directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

# Import project modules
from src.video.video_processor import download_video
from src.audio.transcriber import transcribe_audio
from src.text.timestamp import extract_text_by_timestamps
from src.text.summarizer import summarize_text

def initialize_session_state():
    """Initialize session state variables"""
    if 'summary_history' not in st.session_state:
        st.session_state.summary_history = []
    if 'processing_complete' not in st.session_state:
        st.session_state.processing_complete = False

def display_header():
    """Display the application header"""
    st.set_page_config(
        page_title="AI Video Summarizer",
        page_icon="🎥",
        layout="wide"
    )
    
    st.markdown("""
        <style>
        .stApp {
            background-color: #E6E6FA;  /* Lavender background */
        }
        .main {
            padding: 2rem;
        }
        .stButton>button {
            width: 100%;
            height: 3em;
            margin-top: 1em;
            background-color: #9370DB;  /* Medium Purple for buttons */
            color: white;
            border: none;
            border-radius: 5px;
        }
        .stButton>button:hover {
            background-color: #8A2BE2;  /* Darker purple on hover */
        }
        .success-message {
            padding: 1em;
            border-radius: 0.5em;
            background-color: #F0E6FF;  /* Light lavender for success messages */
            color: #4B0082;  /* Indigo text */
            margin: 1em 0;
            border: 1px solid #9370DB;
        }
        .error-message {
            padding: 1em;
            border-radius: 0.5em;
            background-color: #FFE6E6;
            color: #8B0000;
            margin: 1em 0;
            border: 1px solid #FF69B4;
        }
        .stTextInput>div>div {
            background-color: white;
            border: 1px solid #9370DB;
        }
        .stProgress>div>div {
            background-color: #9370DB;
        }
        .stExpander {
            background-color: white;
            border: 1px solid #9370DB;
            border-radius: 5px;
        }
        h1, h2, h3 {
            color: #4B0082;  /* Indigo headers */
        }
        </style>
    """, unsafe_allow_html=True)
    
    st.title("🎥 AI Video Lecture Summarizer")
    st.markdown("---")

def clean_temp_files():
    """Clean up temporary audio files"""
    temp_files = ['downloaded_audio.wav', 'downloaded_audio.flac']
    for file in temp_files:
        if os.path.exists(file):
            os.remove(file)

def main():
    initialize_session_state()
    display_header()
    
    # Create two columns for input
    col1, col2 = st.columns([2, 1])
    
    with col1:
        video_url = st.text_input("🔗 YouTube Video URL", 
                                 placeholder="Enter YouTube URL here...")
    
    with col2:
        st.markdown("⏱️ Time Range (Optional)")
        start_col, end_col = st.columns(2)
        with start_col:
            start_time = st.text_input("Start Time", 
                                     value="00:00:00",
                                     help="Format: HH:MM:SS")
        with end_col:
            end_time = st.text_input("End Time", 
                                   value="00:05:00",
                                   help="Format: HH:MM:SS")

    # Process button
    if st.button("🚀 Generate Summary", type="primary"):
        if not video_url:
            st.error("⚠️ Please enter a YouTube video URL")
            return
        
        try:
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            # Download video
            status_text.text("📥 Downloading video...")
            progress_bar.progress(20)
            download_video(video_url)
            
            # Transcribe audio
            status_text.text("🎯 Transcribing audio...")
            progress_bar.progress(40)
            transcript = transcribe_audio('downloaded_audio.wav')
            
            # Extract relevant text
            status_text.text("📝 Extracting relevant text...")
            progress_bar.progress(60)
            relevant_text = extract_text_by_timestamps(transcript, start_time, end_time)
            
            # Generate summary
            status_text.text("✨ Generating summary...")
            progress_bar.progress(80)
            summary = summarize_text(relevant_text)
            
            # Complete
            progress_bar.progress(100)
            status_text.empty()
            
            # Display results
            st.markdown("### 📋 Summary")
            st.markdown(f"<div class='success-message'>{summary}</div>", 
                       unsafe_allow_html=True)
            
            # Add to history
            st.session_state.summary_history.append({
                'url': video_url,
                'summary': summary,
                'timestamp': time.strftime("%Y-%m-%d %H:%M:%S")
            })
            
            # Clean up
            clean_temp_files()
            
        except Exception as e:
            st.error(f"❌ An error occurred: {str(e)}")
            clean_temp_files()
    
    # Display history in expander
    if st.session_state.summary_history:
        with st.expander("📚 Summary History"):
            for idx, item in enumerate(reversed(st.session_state.summary_history)):
                st.markdown(f"**Video {len(st.session_state.summary_history)-idx}**")
                st.markdown(f"*URL: {item['url']}*")
                st.markdown(f"*Generated on: {item['timestamp']}*")
                st.markdown(f"<div class='success-message'>{item['summary']}</div>", 
                           unsafe_allow_html=True)
                st.markdown("---")

    # Footer
    st.markdown("---")
    st.markdown(
        """
        <div style='text-align: center'>
            <p>Made with ❤️ using Streamlit and Google AI</p>
        </div>
        """, 
        unsafe_allow_html=True
    )

if __name__ == "__main__":
    main() 