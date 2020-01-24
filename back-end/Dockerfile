FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /usr/src/app/
COPY ./.flaskenv /usr/src/app/
WORKDIR /usr/src/app

RUN pip install -r requirements.txt && pip install python-dotenv
COPY . /usr/src/app/
EXPOSE 5000
ENTRYPOINT [ "python" ]

CMD [ "back-end.py" ]
