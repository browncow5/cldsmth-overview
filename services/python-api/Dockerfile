FROM python:3.12-slim

WORKDIR /app

ARG CLOUDSMITH_WORKSPACE
ARG CLOUDSMITH_REPOSITORY
ARG CLOUDSMITH_SERVICE

COPY requirements.txt .

# The API key is mounted as a BuildKit secret, so it is available only to this
# RUN and never lands in a layer or in `docker history`.
RUN --mount=type=secret,id=cloudsmith_api_key \
    pip install \
      --index-url "https://$CLOUDSMITH_SERVICE:$(cat /run/secrets/cloudsmith_api_key)@dl.cloudsmith.io/basic/$CLOUDSMITH_WORKSPACE/$CLOUDSMITH_REPOSITORY/python/simple/" \
      -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
