import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from grammarmodel import check_grammar
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define request model
class GrammarCheckRequest(BaseModel):
    text: str

# Define response model
class GrammarCheckResponse(BaseModel):
    original_text: str
    corrected_text: str

@app.post("/check-grammar", response_model=GrammarCheckResponse)
async def grammar_check_endpoint(request: GrammarCheckRequest):
    try:
        # Ensure we're passing the text string, not the whole request object
        response = await check_grammar(request.text)
        
        # Check if response is already a dictionary
        if isinstance(response, dict):
            parsed_response = response
        else:
            parsed_response = json.loads(response)
        
        return GrammarCheckResponse(
            original_text=parsed_response["original_text"],
            corrected_text=parsed_response["corrected_text"]
        )
    except AttributeError as ae:
        raise HTTPException(status_code=500, detail=f"AttributeError: {str(ae)}. Make sure 'text' is being passed correctly.")
    except json.JSONDecodeError as je:
        raise HTTPException(status_code=500, detail=f"JSON Decode Error: {str(je)}. The response from check_grammar is not valid JSON.")
    except KeyError as ke:
        raise HTTPException(status_code=500, detail=f"KeyError: {str(ke)}. The response is missing expected keys.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)