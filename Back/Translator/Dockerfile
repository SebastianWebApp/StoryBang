# # FROM python:3.10-slim
# FROM python:3.11-slim


# RUN pip install --upgrade pip
# RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# # Resto de comandos para copiar tu app, etc.
# COPY requirements.txt .
# RUN pip install -r requirements.txt

# COPY . .

# EXPOSE 4020
# CMD ["python", "main.py"]


FROM python:3.11

RUN apt-get update && apt-get install -y build-essential libffi-dev libssl-dev

RUN pip install --upgrade pip

COPY requirements.txt .

# Instalar PyTorch CPU primero
RUN pip install --no-cache-dir --default-timeout=300 \
    torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Instalar el resto de requirements sin torch para evitar conflictos
RUN grep -v '^torch' requirements.txt > requirements-light.txt && \
    pip install --no-cache-dir --default-timeout=300 --prefer-binary -r requirements-light.txt

COPY . .

EXPOSE 4020

CMD ["python", "main.py"]
