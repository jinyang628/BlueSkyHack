import requests

url = 'https://dynamic-condor-reliably.ngrok-free.app/llama2'  # Change this URL if needed

query = """What is my name?"""
# context = """ """
data = {"input": query
        # , "context":context
        }  # Your JSON data to send

response = requests.post(url, json=data)
print(response.json())