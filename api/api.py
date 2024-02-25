from flask import * 
import json, time
# import torch
# import transformers
# from torch import cuda, bfloat16
import requests
# generate_text
# generate_text_demo = transformers.pipeline(
#     model=model, tokenizer=tokenizer,
#     return_full_text=False,
#     task='text-generation',
#     temperature=0.0,  # 'randomness' of outputs, 0.0 is the min and 1.0 the max
#     max_new_tokens=1024,  # mex number of tokens to generate in the output
#     repetition_penalty=1.1  # without this output begins repeating
# )


app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home_page():
    data_set = {'Page': 'Home', 'Message': 'successsfully loaded the home page', 'Timestamp': time.time()}
    json_dump = json.dumps(data_set) 

    return json_dump

@app.route('/llama2/', methods = ['POST'])
def pred():
    data = request.json
    # Your data processing logic here...
    # res = generate_text_demo(f"""{data["input"]}""")
    res = 1
    # Return the response in JSON format
    return jsonify({"message": "Data processed successfully", "result": res})



if __name__ == '__main__':
    app.run(port=7711)