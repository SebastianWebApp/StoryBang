FROM python:3.10-slim

RUN pip install --upgrade pip
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Resto de comandos para copiar tu app, etc.
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 4020
CMD ["python", "main.py"]
