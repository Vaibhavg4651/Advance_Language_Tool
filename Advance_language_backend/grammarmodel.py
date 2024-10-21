import os
from openai import AzureOpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = AzureOpenAI(
    azure_endpoint = os.getenv("AZURE_OPEN_AI_ENDPOINT"), 
    api_key=os.getenv("AZURE_OPEN_AI_KEY"),  
    api_version=os.getenv("API_VERSION")
)

async def check_grammar(text: str):
    try:
        response = client.chat.completions.create(
            model="gpt35turbo",  # Make sure this matches your deployed model name
            messages=[
                {"role": "system", "content": "You are a helpful assistant that checks grammar and provides suggestions for improvement."},
                {"role": "user", "content": f'''Act as a grammar corrector helpful assistant and Analyze the given sentence for grammatical errors. Help with getting the analysis as given below in JSON, only reply in JSON as specified 
    Transcript starts here: {text}  Transcript ends here.
    {{
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {{
        "original_text": {{"type": "string"}},
        "corrected_text": {{"type": "string"}}
      }},
      "required": ["original_text", "corrected_text"]
    }}
    only reply in JSON as specified above, no other text or comment'''}
            ],
            max_tokens=150,
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        raise Exception(f"Error in check_grammar: {str(e)}")