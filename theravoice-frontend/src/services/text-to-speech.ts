// Replace with your actual ElevenLabs API key
const ELEVENLABS_API_KEY = 'your-api-key-here';
const VOICE_ID = 'your-voice-id-here'; // Replace with your chosen voice ID

export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    throw new Error('Failed to convert text to speech');
  }
}

export function playAudio(audioData: ArrayBuffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const audioContext = new AudioContext();
    
    audioContext.decodeAudioData(
      audioData,
      (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => {
          resolve();
        };
        source.start(0);
      },
      (error) => {
        console.error('Error decoding audio data:', error);
        reject(error);
      }
    );
  });
} 