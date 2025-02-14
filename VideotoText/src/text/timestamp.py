def extract_text_by_timestamps(transcript, start_time, end_time):
    # The transcript is just text, so we don't need to slice it by time
    # Instead, we'll just return the full text for now
    return transcript

def convert_to_seconds(timestamp):
    hours, minutes, seconds = map(int, timestamp.split(':'))
    return hours * 3600 + minutes * 60 + seconds 