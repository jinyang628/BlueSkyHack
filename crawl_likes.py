
import requests

import json 

from atproto import Client

# def create_client():
  
#   client = Client(base_url='https://bsky.social/xrpc')
                  
#   client.login('samuellee.bsky.social', '&5cx^v4wO48m')

#   print(dir(client))

#   jwt = client._access_jwt
#   print(jwt)
#   return jwt

# jwt = create_client()




def get_post_likes(uri, jwt):
  url = "https://bsky.social/xrpc/app.bsky.feed.getPostThread"

  payload={"uri": uri}
  headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {jwt}'
  }

  response = requests.request("GET", url, headers=headers, params=payload)

  text_json = json.loads(response.text)
  post = text_json["thread"]["post"]["record"]["text"]
  likes = text_json["thread"]["post"]["likeCount"]
  return post, likes


# post, likes = get_post_likes(uri = "at://did:plc:mjh257xyug2mpodoyy3he5ih/app.bsky.feed.post/3km5lx27r5u27",
#                jwt = "eyJhbGciOiJFUzI1NksifQ.eyJzY29wZSI6ImNvbS5hdHByb3RvLmFjY2VzcyIsInN1YiI6ImRpZDpwbGM6emw3MmwzdHRjenp1cHRmZGlvcnhscGhvIiwiaWF0IjoxNzA4ODk0OTQ2LCJleHAiOjE3MDg5MDIxNDYsImF1ZCI6ImRpZDp3ZWI6dmVycGEudXMtd2VzdC5ob3N0LmJza3kubmV0d29yayJ9.bzVfgVeDUrT8sQ_82Wktcj3sJYlGGVRksUvMx0jgg-W6W3hW1amWW-a75bIY7oYsVn6n6U-sesvskH1IymU2Dw"
#                )

# print(post, likes)

import pandas as pd
df = pd.read_csv(r"C:\Users\samuel\bluesky\BlueSkyHack\bot-python\data\sampled_likes.csv")
uris = list(df["subject_uri"])
posts_and_likes = []
i = 0
for uri in uris:
  try:
    post, likes = get_post_likes(uri = uri,
                jwt = "eyJhbGciOiJFUzI1NksifQ.eyJzY29wZSI6ImNvbS5hdHByb3RvLmFjY2VzcyIsInN1YiI6ImRpZDpwbGM6emw3MmwzdHRjenp1cHRmZGlvcnhscGhvIiwiaWF0IjoxNzA4ODk0OTQ2LCJleHAiOjE3MDg5MDIxNDYsImF1ZCI6ImRpZDp3ZWI6dmVycGEudXMtd2VzdC5ob3N0LmJza3kubmV0d29yayJ9.bzVfgVeDUrT8sQ_82Wktcj3sJYlGGVRksUvMx0jgg-W6W3hW1amWW-a75bIY7oYsVn6n6U-sesvskH1IymU2Dw"
                )
    posts_and_likes.append((post, likes))
    df = pd.DataFrame(posts_and_likes, columns=['posts', 'likes'])
    df.to_csv(r"C:\Users\samuel\bluesky\BlueSkyHack\like_data_all.csv", index = False)
  except:
    pass

# https://bsky.app/profile/did:plc:mjh257xyug2mpodoyy3he5ih/post/3km5lx27r5u27