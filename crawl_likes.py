
import requests

url = "https://bsky.social/xrpc/app.bsky.feed.getPostThread"

payload={"uri": "at://did:plc:mjh257xyug2mpodoyy3he5ih/app.bsky.feed.post/3km5lx27r5u27"}
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJFUzI1NksifQ.eyJzY29wZSI6ImNvbS5hdHByb3RvLmFjY2VzcyIsInN1YiI6ImRpZDpwbGM6emw3MmwzdHRjenp1cHRmZGlvcnhscGhvIiwiaWF0IjoxNzA4ODgzODEzLCJleHAiOjE3MDg4OTEwMTMsImF1ZCI6ImRpZDp3ZWI6dmVycGEudXMtd2VzdC5ob3N0LmJza3kubmV0d29yayJ9.hIQQeEITqsprlPftbS9yzfhOM0rdzEPu4cePeiB0r2i5RtJCrzLqBYCkWpZ8-ntJv9ni5TDc8spZQikfdF54Mg'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)


# https://bsky.app/profile/did:plc:mjh257xyug2mpodoyy3he5ih/post/3km5lx27r5u27