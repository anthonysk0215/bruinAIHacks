// Replace with your actual OpenAI API key
const OPENAI_API_KEY = 'your-api-key-here';

export async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are TheraVoice, an empathetic and supportive AI therapist. Provide thoughtful, caring responses that help users process their thoughts and feelings. Keep responses concise and natural, as they will be spoken aloud."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error in getAIResponse:', error);
    throw new Error('Failed to get AI response');
  }
} 