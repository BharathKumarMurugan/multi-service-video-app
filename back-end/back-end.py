from apiclient.discovery import build
import json
import pprint
import sys
import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


api = ""
prefix_url = "https://www.youtube.com/watch?v="
youtube = build('youtube', 'v3', developerKey=api)


def videourl(*args):
    mylist = []
    list = []
    argCount = len(args)
    if argCount > 1:
        for i in args:
            list.append(i)
        var = ','.join(map(str, list))
        req = youtube.search().list(q=var, part="snippet", type="video",
                                    maxResults=5, order="relevance")
        result = req.execute()
    else:
        req = youtube.search().list(q=(args), part="snippet",
                                    type="video", maxResults=50, order="relevance")
        result = req.execute()
    for i in result["items"]:
        item = {}
        item["video_url"] = prefix_url+i['id']['videoId']
        item["channelId"] = i['snippet']['channelId']
        item["video_title"] = i['snippet']['title']
        item["thumbnail_url"] = i['snippet']['thumbnails']['default']['url']
        item["published_date"] = (i['snippet']['publishedAt'])
        # .strftime('%Y-%m-%d %H:%M:%S')
        mylist.append(item)
    return(json.dumps(mylist))


@app.route('/', methods=['GET'])
def api_all():
    # search_str=request.args.get('search')
    search = request.args.get('search','')
    return (videourl(search))

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
