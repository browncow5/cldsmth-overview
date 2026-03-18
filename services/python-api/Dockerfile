FROM python:3.12-slim

WORKDIR /app

ARG CLOUDSMITH_API_KEY
ARG CLOUDSMITH_WORKSPACE
ARG CLOUDSMITH_REPOSITORY
ARG CLOUDSMITH_SERVICE

COPY requirements.txt .
RUN pip install --index-url https://$CLOUDSMITH_SERVICE:$CLOUDSMITH_API_KEY@dl.cloudsmith.io/basic/$CLOUDSMITH_WORKSPACE/$CLOUDSMITH_REPOSITORY/python/simple/ \
    -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
