FROM python:3.12-slim

WORKDIR /app

# Pull dependencies from Cloudsmith PyPI upstream proxy
ARG CLOUDSMITH_API_KEY
RUN echo "API key length: $(echo -n ${CLOUDSMITH_API_KEY} | wc -c)"

COPY requirements.txt .
RUN pip install --index-url https://dl.cloudsmith.io/$CLOUDSMITH_API_KEY/red-acme-inc/cldsmth-overview/python/simple/ \
    --trusted-host dl.cloudsmith.io \
    --no-cache-dir \
    -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
