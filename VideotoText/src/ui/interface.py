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
        /* Base styles */
        * {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #FFFFFF;
        }
        .stApp {
            background-color: #1A1A1A;
        }
        
        /* All text elements */
        .stMarkdown, p, label, span, div, .stTextInput input, 
        .stSelectbox, .stTextInput label, .stMarkdown p,
        .stExpander p, .stExpander div, .stMarkdown a,
        .stMarkdown code, .stMarkdown pre {
            color: #FFFFFF !important;
        }
        
        /* Headers - keep orange for contrast */
        h1, h2, h3 {
            color: #FF8C00 !important;
            font-weight: 600;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 0.5px;
        }
        
        /* Input fields */
        .stTextInput>div>div {
            background-color: #2D2D2D;
            border: 2px solid #FF8C00;
            color: #FFFFFF !important;
        }
        
        /* Placeholder text */
        ::placeholder {
            color: rgba(255,255,255,0.6) !important;
        }
        
        /* Messages */
        .success-message, .error-message {
            background-color: #2D2D2D;
            color: #FFFFFF !important;
        }
        
        /* Links */
        a {
            color: #FF8C00 !important;
        }
        a:hover {
            color: #FFA500 !important;
        }
        
        /* Time input labels */
        .stMarkdown strong, .stMarkdown em {
            color: #FFFFFF !important;
        }
        
        /* History items */
        .stExpander strong, .stExpander em {
            color: #FFFFFF !important;
        }
        
        /* Text styles */
        .stMarkdown, p, label, .stTextInput input {
            font-size: 16px;
        }
        
        /* Input fields */
        .stTextInput>div>div {
            border-radius: 5px;
        }
        
        /* Messages */
        .success-message, .error-message {
            padding: 1.2em;
            line-height: 1.6;
        }
        .success-message {
            border-left: 4px solid #FF8C00;
        }
        .error-message {
            border-left: 4px solid #FF4500;
        }
        
        /* Expander */
        .stExpander {
            background-color: #2D2D2D;
            color: #FFFFFF;
            border: 1px solid #FF8C00;
            border-radius: 8px;
        }
        
        /* Button */
        .stButton>button {
            background-color: #FF8C00;
            color: #FFFFFF;
            font-weight: 600;
            font-size: 16px;
            padding: 0.5em 1em;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(255, 140, 0, 0.2);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .stButton>button:hover {
            background-color: #FFA500;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(255, 140, 0, 0.3);
        }
        
        /* Progress bar */
        .stProgress>div>div {
            background-color: #FF8C00;
        }
        </style>
    """, unsafe_allow_html=True)
    
    st.title("AI Video Lecture Summarizer")
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
        video_url = st.text_input("YouTube Video URL", 
                                 placeholder="Enter YouTube URL here...")
    
    with col2:
        st.markdown("Time Range (Optional)")
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
    if st.button("Generate Summary", type="primary"):
        if not video_url:
            st.error("Please enter a YouTube video URL")
            return
        
        try:
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            # Download video
            status_text.text(" Downloading video...")
            progress_bar.progress(20)
            download_video(video_url)
            
            # Transcribe audio
            status_text.text(" Transcribing audio...")
            progress_bar.progress(40)
            transcript = transcribe_audio('downloaded_audio.wav')
            
            # Extract relevant text
            status_text.text(" Extracting relevant text...")
            progress_bar.progress(60)
            relevant_text = extract_text_by_timestamps(transcript, start_time, end_time)
            
            # Generate summary
            status_text.text(" Generating summary...")
            progress_bar.progress(80)
            summary = summarize_text(relevant_text)
            
            # Complete
            progress_bar.progress(100)
            status_text.empty()
            
            # Display results
            st.markdown("###  Summary")
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
            st.error(f" An error occurred: {str(e)}")
            clean_temp_files()
    
    # Display history in expander
    if st.session_state.summary_history:
        with st.expander("Summary History"):
            for idx, item in enumerate(reversed(st.session_state.summary_history)):
                st.markdown(f"**Video {len(st.session_state.summary_history)-idx}**")
                st.markdown(f"*URL: {item['url']}*")
                st.markdown(f"*Generated on: {item['timestamp']}*")
                st.markdown(f"<div class='success-message'>{item['summary']}</div>", 
                           unsafe_allow_html=True)
                st.markdown("---")

    # Footer

if __name__ == "__main__":
    main() 