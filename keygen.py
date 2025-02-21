import openai

openai.api_key = "your_openai_api_key"
response = openai.Completion.create(
    engine="text-davinci-003",
    prompt="Hello, how are you?",
    max_tokens=50
)
print(response.choices[0].text.strip())