class InstanceConfig {
  constructor() {
    this.IPs = [
     "eipalloc-0fbaa0ccfae536985", 
     "eipalloc-0af7d3f6436450020",
     "eipalloc-06fb5b302d7491e2e",
     "eipalloc-0657fc4f31816850c",
     "eipalloc-0687fbf3b2e140243",
     "eipalloc-0c88e4ba5c1670516",
     "eipalloc-048619058a8f99976",
     "eipalloc-0c2aec24c2c5345b8",
     "eipalloc-0be12ae113c0d1d2e",
     "eipalloc-0664edc6eb22e14c7",
     "eipalloc-05ce00aa44d873039",
     "eipalloc-09c0a9db90d3d525d",
     "eipalloc-0c045e2356f56ddab",
     "eipalloc-0fa668ac1278b23dc", 
     "eipalloc-06fa348a7e67e16d0",
     "eipalloc-013a0431ffb3a5e7a",
     "eipalloc-0d2f25919f3ed6883",
     "eipalloc-0120c243a973ead73",
     "eipalloc-01d239811816dcc03",
     "eipalloc-01a283c63ffd1d31d",
     "eipalloc-0039bc9a608297529",
     "eipalloc-0b7f0257e8130312e",
     "eipalloc-089ae73671934ff97",
     "eipalloc-02c65872c1bc19a33",
     "eipalloc-09cf9f338746b5687",
     "eipalloc-0308a3343ef1cf3ba",
     "eipalloc-0f81eda5950e061ae",
     "eipalloc-0164e34981fc5163e",
     "eipalloc-0552bb9c4d896753b",
     "eipalloc-06d230d22efe1f87d",
     "eipalloc-0fe3f364d34600855",
     "eipalloc-0c06f802cabaf2d67",
     "eipalloc-0612c60cee6fce251",
     "eipalloc-062e8358ad9022844",
     "eipalloc-0061ab2f051e3054a",
     "eipalloc-0577566aec5de0394",
     "eipalloc-085a6b34e1331843f",
     "eipalloc-0210d96a3916cf4d2"
    ];
    this.Names = [
      "Bull User", "Mysql", "Bull Code", "Kafka", "Messaging",
      "JWT", "Encryption", "Decryption", 
      "Recover Password", "Delete", "Update", "Read",
      "Check", "Create", "Verify", "Whatsapp",
      "Create", "Read", "Delete", "Bull Character", "MongoDB Character",
      "Grok-Image", "Grok-Description", "Grok-Text", "Bull Generator", "Bull Story",
      "GPT Small", "GPT Medium", "MongoDB Story",
      "Create", "Update", "Read", "Read-Id", "Delete",
      "Orchestrator", "Front", "Bastion", "Traductor"
    ];
    
    this.Instance = [
      "t2.large", "t2.large", "t2.large", "t2.large", "t2.large",
      "t2.large", "t2.micro", "t2.micro",
      "t2.micro", "t2.micro", "t2.micro", "t2.micro",  
      "t2.micro", "t2.micro", "t2.micro", "t2.micro",  
      "t2.micro", "t2.micro", "t2.micro", "t2.large", "t2.large", 
      "t2.micro", "t2.micro", "t2.micro", "t2.large", "t2.large",  
      "t2.large", "t2.large", "t2.large",
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro",
      "t2.micro", "t2.micro", "t2.large", "t2.large"
    ];
    this.Type = [
      "Elastic", "Elastic", "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic", "Elastic", "Elastic",
      "Elastic", "Elastic", "Elastic", "Elastic"
    ];
    this.Port_Target = [
      0, 0, 0, 0, 0, 
      0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0
    ];
    this.SecurityGroupIds = [
      "sg-0901366025d04deab", "sg-0901366025d04deab", "sg-0901366025d04deab", "sg-0901366025d04deab", "sg-0901366025d04deab",
      "sg-07e97e405bf36d606", "sg-07e97e405bf36d606", "sg-07e97e405bf36d606",
      "sg-0dbdc458fe390ed0b", "sg-0dbdc458fe390ed0b", "sg-0dbdc458fe390ed0b", "sg-0dbdc458fe390ed0b", 
      "sg-04c39548af5ceb2b2", "sg-04c39548af5ceb2b2", "sg-04c39548af5ceb2b2", "sg-04c39548af5ceb2b2", 
      "sg-0db25a3ebc23e755a", "sg-0db25a3ebc23e755a", "sg-0db25a3ebc23e755a", "sg-0db25a3ebc23e755a", "sg-0db25a3ebc23e755a", 
      "sg-0eb87ff8c1ab1b741", "sg-0eb87ff8c1ab1b741", "sg-0eb87ff8c1ab1b741", "sg-0eb87ff8c1ab1b741", "sg-0eb87ff8c1ab1b741", 
      "sg-0648bf7257a21f404", "sg-0648bf7257a21f404", "sg-0648bf7257a21f404", 
      "sg-06151e20ed185242a", "sg-06151e20ed185242a", "sg-06151e20ed185242a", "sg-06151e20ed185242a", "sg-06151e20ed185242a", 
      "sg-0550a5d0b521c9691", "sg-0550a5d0b521c9691", "sg-08b44f38efd556fd8", "sg-0a9aeff8e57ea07c2"
    ];
    this.Scripts = [
      `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull redis:latest
    docker volume create redis_data || true
    
    docker stop redis || true
    docker rm redis || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name redis \
        -v redis_data:/data \
        -p 6379:6379 \
        --restart always \
        redis:latest
    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    
    docker pull mysql:latest
    docker volume create mysql_data || true
    
    docker stop base_mysql || true
    docker rm base_mysql || true
    
    # Iniciar el contenedor de Mysql
    docker run -d --name base_mysql \
        -v mysql_data:/var/lib/mysql \
        -e MYSQL_ROOT_PASSWORD=root \
        -p 3307:3306 \
        --restart always \
        mysql:latest
        
        
    # Contenedor story_bang_mysql_structure_main
    docker pull sebastianwebapp/story_bang_mysql_structure_main:latest
    
    docker stop story_bang_mysql_structure_main || true
    docker rm story_bang_mysql_structure_main || true
    
    docker run -d --name story_bang_mysql_structure_main \
        -p 4000:4000 \
        --restart no \
        sebastianwebapp/story_bang_mysql_structure_main:latest
        

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull redis:latest
    docker volume create redis_data || true
    
    docker stop redis || true
    docker rm redis || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name redis \
        -v redis_data:/data \
        -p 6379:6379 \
        --restart always \
        redis:latest
    
      `,
      `#!/bin/bash
    
    # Exit on critical errors
    set -e
    
    # Step 1: Update the system
    echo "Actualizando el sistema..."
    sudo apt update -y && sudo apt upgrade -y
    
    # Step 2: Install Docker
    echo "Instalando Docker..."
    sudo apt install -y docker.io
    
    # Step 3: Start and enable Docker
    echo "Iniciando y habilitando Docker..."
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Step 4: Add user to docker group
    echo "Agregando usuario al grupo docker..."
    sudo usermod -aG docker $USER
    
    # Step 5: Set permissions for Docker socket
    echo "Configurando permisos del socket de Docker..."
    sudo chmod 666 /var/run/docker.sock
    
    # Step 6: Install Docker Compose
    echo "Instalando Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    if [ ! -f /usr/bin/docker-compose ]; then
        sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    else
        echo "El enlace simbólico de Docker Compose ya existe, omitiendo creación."
    fi
    
    # Step 8: Stop any existing containers
    echo "Deteniendo contenedores existentes..."
    sudo docker-compose -f /home/ubuntu/docker-compose.yml down 2>/dev/null || true
    
    # Step 9: Create docker-compose.yml with dynamic IP
    echo "Creando docker-compose.yml con IP $PUBLIC_IP..."
    cat <<EOF > /home/ubuntu/docker-compose.yml
    version: '2'
    services:
      zookeeper:
        image: wurstmeister/zookeeper:latest
        container_name: zookeeper
        ports:
          - "2181:2181"
        restart: unless-stopped
        networks:
          - spark-kafka-network
        volumes:
          - zookeeper-data:/data
          - zookeeper-datalog:/datalog
    
      kafka:
        image: wurstmeister/kafka:latest
        container_name: kafka
        ports:
          - "9092:9092"
        environment:
          KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
          KAFKA_ADVERTISED_HOST_NAME: 54.208.122.80
          KAFKA_ADVERTISED_PORT: 9092
          KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
          KAFKA_BROKER_ID: 1
          KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
          KAFKA_HEAP_OPTS: "-Xmx512M -Xms512M"
        volumes:
          - kafka-data:/kafka
          - /var/run/docker.sock:/var/run/docker.sock
        restart: unless-stopped
        networks:
          - spark-kafka-network
        depends_on:
          - zookeeper
    
    networks:
      spark-kafka-network:
        driver: bridge
    
    volumes:
      zookeeper-data:
      zookeeper-datalog:
      kafka-data:
EOF
    
    # Step 10: Deploy Docker Compose stack
    echo "Iniciando el stack de Docker Compose..."
    sudo docker-compose -f /home/ubuntu/docker-compose.yml up -d
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor messages_user
    docker pull sebastianwebapp/story_bang_messages_user_main:latest
    
    docker stop messages_user || true
    docker rm messages_user || true
    
    docker run -d --name messages_user \
        -p 4003:4003 \
        --restart always \
        sebastianwebapp/story_bang_messages_user_main:latest


    # Tunel
    ssh -p 443 -R0:127.0.0.1:4003 -L4300:127.0.0.1:4300 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 1X2D07XMxcU@pro.pinggy.io
    


      `,       
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_jwt
    docker pull sebastianwebapp/story_bang_jwt_main:latest
    
    docker stop story_bang_jwt || true
    docker rm story_bang_jwt || true
    
    docker run -d --name story_bang_jwt \
        -p 4012:4012 \
        --restart always \
        sebastianwebapp/story_bang_jwt_main:latest
    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_encrypt
    docker pull sebastianwebapp/story_bang_encrypt_main:latest
    
    docker stop story_bang_encrypt || true
    docker rm story_bang_encrypt || true
    
    docker run -d --name story_bang_encrypt \
        -p 4005:4005 \
        --restart always \
        sebastianwebapp/story_bang_encrypt_main:latest
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_decrypt
    docker pull sebastianwebapp/story_bang_decrypt_main:latest
    
    docker stop story_bang_decrypt || true
    docker rm story_bang_decrypt || true
    
    docker run -d --name story_bang_decrypt \
        -p 4006:4006 \
        --restart always \
        -e RACK_ENV=production \
        sebastianwebapp/story_bang_decrypt_main:latest
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_password_recovery_main
    docker pull sebastianwebapp/story_bang_password_recovery_main:latest
    
    docker stop story_bang_password_recovery_main || true
    docker rm story_bang_password_recovery_main || true
    
    docker run -d --name story_bang_password_recovery_main \
        -p 4010:4010 \
        --restart always \
        sebastianwebapp/story_bang_password_recovery_main:latest
        
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_delete_user_main
    docker pull sebastianwebapp/story_bang_delete_user_main:latest
    
    docker stop story_bang_delete_user_main || true
    docker rm story_bang_delete_user_main || true
    
    docker run -d --name story_bang_delete_user_main \
        -p 4011:4011 \
        --restart always \
        sebastianwebapp/story_bang_delete_user_main:latest
        
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_update_user_main
    docker pull sebastianwebapp/story_bang_update_user_main:latest
    
    docker stop story_bang_update_user_main || true
    docker rm story_bang_update_user_main || true
    
    docker run -d --name story_bang_update_user_main \
        -p 4008:4008 \
        --restart always \
        sebastianwebapp/story_bang_update_user_main:latest
        
    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_read_user_main
    docker pull sebastianwebapp/story_bang_read_user_main:latest
    
    docker stop story_bang_read_user_main || true
    docker rm story_bang_read_user_main || true
    
    docker run -d --name story_bang_read_user_main \
        -p 4007:4007 \
        --restart always \
        sebastianwebapp/story_bang_read_user_main:latest
        
  
    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_verification_main
    docker pull sebastianwebapp/story_bang_verification_main:latest
    
    docker stop story_bang_verification_main || true
    docker rm story_bang_verification_main || true
    
    docker run -d --name story_bang_verification_main \
        -p 4001:4001 \
        --restart always \
        sebastianwebapp/story_bang_verification_main:latest
        
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_create_user_main
    docker pull sebastianwebapp/story_bang_create_user_main:latest
    
    docker stop story_bang_create_user_main || true
    docker rm story_bang_create_user_main || true
    
    docker run -d --name story_bang_create_user_main \
        -p 4004:4004 \
        --restart always \
        sebastianwebapp/story_bang_create_user_main:latest
       
    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_verify_user_main
    docker pull sebastianwebapp/story_bang_verify_user_main:latest
    
    docker stop story_bang_verify_user_main || true
    docker rm story_bang_verify_user_main || true
    
    docker run -d --name story_bang_verify_user_main \
        -p 4009:4009 \
        --restart always \
        sebastianwebapp/story_bang_verify_user_main:latest
        
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    
    # Contenedor story_bang_whatsapp_main
    docker pull sebastianwebapp/story_bang_whatsapp_main:latest
    
    docker stop story_bang_whatsapp_main || true
    docker rm story_bang_whatsapp_main || true
    
    docker run -d --name story_bang_whatsapp_main \
        -p 4002:4002 \
        --restart always \
        sebastianwebapp/story_bang_whatsapp_main:latest
        

    # Tunel
    ssh -p 443 -R0:127.0.0.1:4002 -L4300:127.0.0.1:4300 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 86ySMQc3n7w@pro.pinggy.io

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_create_character_main
    docker pull sebastianwebapp/story_bang_create_character_main:latest
    
    docker stop story_bang_create_character_main || true
    docker rm story_bang_create_character_main || true
    
    docker run -d --name story_bang_create_character_main \
        -p 4016:4016 \
        --restart always \
        sebastianwebapp/story_bang_create_character_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_read_character_main
    docker pull sebastianwebapp/story_bang_read_character_main:latest
    
    docker stop story_bang_read_character_main || true
    docker rm story_bang_read_character_main || true
    
    docker run -d --name story_bang_read_character_main \
        -p 4018:4018 \
        --restart always \
        sebastianwebapp/story_bang_read_character_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_delete_character_main
    docker pull sebastianwebapp/story_bang_delete_character_main:latest
    
    docker stop story_bang_delete_character_main || true
    docker rm story_bang_delete_character_main || true
    
    docker run -d --name story_bang_delete_character_main \
        -p 4017:4017 \
        --restart always \
        sebastianwebapp/story_bang_delete_character_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull redis:latest
    docker volume create redis_data || true
    
    docker stop redis || true
    docker rm redis || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name redis \
        -v redis_data:/data \
        -p 6379:6379 \
        --restart always \
        redis:latest
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull mongo:latest
    docker volume create mongodb_data || true
    
    docker stop base_mongoDB || true
    docker rm base_mongoDB || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name base_mongoDB \
        -v mongodb_data:/data/db \
        -p 27017:27017 \
        --restart always \
        mongo:latest
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_grok_image_generator_main
    docker pull sebastianwebapp/story_bang_grok_image_generator_main:latest
    
    docker stop story_bang_grok_image_generator_main || true
    docker rm story_bang_grok_image_generator_main || true
    
    docker run -d --name story_bang_grok_image_generator_main \
        -p 4013:4013 \
        --restart always \
        sebastianwebapp/story_bang_grok_image_generator_main:latest

    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_create_user_main
    docker pull sebastianwebapp/story_bang_grok_description_image_main:latest
    
    docker stop story_bang_grok_description_image_main || true
    docker rm story_bang_grok_description_image_main || true
    
    docker run -d --name story_bang_grok_description_image_main \
        -p 4015:4015 \
        --restart always \
        sebastianwebapp/story_bang_grok_description_image_main:latest

    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_grok_text_generator_main
    docker pull sebastianwebapp/story_bang_grok_text_generator_main:latest
    
    docker stop story_bang_grok_text_generator_main || true
    docker rm story_bang_grok_text_generator_main || true
    
    docker run -d --name story_bang_grok_text_generator_main \
        -p 4014:4014 \
        --restart always \
        sebastianwebapp/story_bang_grok_text_generator_main:latest
      
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull redis:latest
    docker volume create redis_data || true
    
    docker stop redis || true
    docker rm redis || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name redis \
        -v redis_data:/data \
        -p 6379:6379 \
        --restart always \
        redis:latest
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull redis:latest
    docker volume create redis_data || true
    
    docker stop redis || true
    docker rm redis || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name redis \
        -v redis_data:/data \
        -p 6379:6379 \
        --restart always \
        redis:latest
      `,      
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_gpt2_text_generator_main
    docker pull sebastianwebapp/story_bang_gpt2_text_generator_main:latest
    
    docker stop story_bang_gpt2_text_generator_main || true
    docker rm story_bang_gpt2_text_generator_main || true
    
    docker run -d --name story_bang_gpt2_text_generator_main \
        -p 4019:4019 \
        -v /home/ubuntu/story_model:/app/story_model \
        --restart always \
        sebastianwebapp/story_bang_gpt2_text_generator_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_gpt2medium_text_generator_main
    docker pull sebastianwebapp/story_bang_gpt2medium_text_generator_main:latest
    
    docker stop story_bang_gpt2medium_text_generator_main || true
    docker rm story_bang_gpt2medium_text_generator_main || true
    
    docker run -d --name story_bang_gpt2medium_text_generator_main \
        -p 4021:4021 \
        -v /home/ubuntu/story_model:/app/story_model \
        --restart always \
        sebastianwebapp/story_bang_gpt2medium_text_generator_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    docker pull mongo:latest
    docker volume create mongodb_data || true
    
    docker stop base_mongoDB || true
    docker rm base_mongoDB || true
      
    # Iniciar el contenedor de Redis
    docker run -d --name base_mongoDB \
        -v mongodb_data:/data/db \
        -p 27017:27017 \
        --restart always \
        mongo:latest
    
      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_create_story_main
    docker pull sebastianwebapp/story_bang_create_story_main:latest
    
    docker stop story_bang_create_story_main || true
    docker rm story_bang_create_story_main || true
    
    docker run -d --name story_bang_create_story_main \
        -p 4022:4022 \
        --restart always \
        sebastianwebapp/story_bang_create_story_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_update_story_main
    docker pull sebastianwebapp/story_bang_update_story_main:latest
    
    docker stop story_bang_update_story_main || true
    docker rm story_bang_update_story_main || true
    
    docker run -d --name story_bang_update_story_main \
        -p 4024:4024 \
        --restart always \
        sebastianwebapp/story_bang_update_story_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_read_story_main
    docker pull sebastianwebapp/story_bang_read_story_main:latest
    
    docker stop story_bang_read_story_main || true
    docker rm story_bang_read_story_main || true
    
    docker run -d --name story_bang_read_story_main \
        -p 4026:4026 \
        --restart always \
        sebastianwebapp/story_bang_read_story_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_read_id_story_main
    docker pull sebastianwebapp/story_bang_read_id_story_main:latest
    
    docker stop story_bang_read_id_story_main || true
    docker rm story_bang_read_id_story_main || true
    
    docker run -d --name story_bang_read_id_story_main \
        -p 4023:4023 \
        --restart always \
        sebastianwebapp/story_bang_read_id_story_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_delete_story_main
    docker pull sebastianwebapp/story_bang_delete_story_main:latest
    
    docker stop story_bang_delete_story_main || true
    docker rm story_bang_delete_story_main || true
    
    docker run -d --name story_bang_delete_story_main \
        -p 4025:4025 \
        --restart always \
        sebastianwebapp/story_bang_delete_story_main:latest

      `,
      `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_orchestrator_main
    docker pull sebastianwebapp/story_bang_orchestrator_main:latest
    
    docker stop story_bang_orchestrator_main || true
    docker rm story_bang_orchestrator_main || true
    
    docker run -d --name story_bang_orchestrator_main \
        -p 4027:4027 \
        --restart always \
        sebastianwebapp/story_bang_orchestrator_main:latest

      `,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_frontend_main
    docker pull sebastianwebapp/story_bang_frontend_main:latest
    
    docker stop story_bang_frontend_main || true
    docker rm story_bang_frontend_main || true
    
    docker run -d --name story_bang_frontend_main \
        -p 443:443 \
        --restart always \
        sebastianwebapp/story_bang_frontend_main:latest
    

      `,
      `#!/bin/bash
# Actualiza los paquetes
apt update && apt upgrade -y
# Instala OpenSSH (ya viene en Ubuntu normalmente)
apt install -y openssh-server
# Asegura que el servicio SSH esté activo
systemctl enable ssh
systemctl start ssh
# (Opcional) Crea un usuario si no vas a usar 'ubuntu'
# useradd -m -s /bin/bash bastionuser
# mkdir /home/bastionuser/.ssh
# chown bastionuser:bastionuser /home/bastionuser/.ssh
# El script no necesita más porque el reenvío se hace desde el cliente (tu PC)
`,
       `#!/bin/bash
    
    # Actualizar el sistema
    sudo apt update -y && sudo apt upgrade -y
    
    # Instalar Docker
    sudo apt install -y docker.io
    
    # Iniciar y habilitar Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    sudo usermod -aG docker $USER
    
    # Configurar permisos para el socket Docker
    sudo chmod 666 /var/run/docker.sock

    # Contenedor story_bang_translator_main
    docker pull sebastianwebapp/story_bang_translator_main:latest

    docker stop story_bang_translator_main || true
    docker rm story_bang_translator_main || true

    docker run -d --name story_bang_translator_main \
        -p 4020:4020 \
        --restart always \
        sebastianwebapp/story_bang_translator_main:latest

      `
    ];
   
  }


  getInstanceParams(index) {

    return {
      ImageId: "ami-020cba7c55df1f615",
      InstanceType: this.Instance[index],
      MinCount: 1,
      MaxCount: 1,
      KeyName: "Distribuida",
      SecurityGroupIds: [this.SecurityGroupIds[index]],
      TagSpecifications: [
        {
          ResourceType: "instance",
          Tags: [{ Key: "Name", Value: this.Names[index] }]
        }
      ],      
    BlockDeviceMappings: [
      {
        DeviceName: "/dev/sda1",  // o el device root que use tu AMI
        Ebs: {
          VolumeSize: 15,        // tamaño en GiB
          VolumeType: "gp3",     // tipo de volumen
          DeleteOnTermination: true,
          Encrypted: false       // o true si quieres cifrar
        }
      }
    ],
      UserData: Buffer.from(this.Scripts[index]).toString('base64')
    };
  }
}

export default InstanceConfig;





// # ----------------------------
// # Variables del proyecto
// # ----------------------------
// DIR="$HOME/aws_ec2_connect"
// PEM_FILE="Distribuida1.pem"
// PRIVATE_KEY_PATH="$DIR/$PEM_FILE"

// EC2_USER="ubuntu"
// EC2_HOST="ec2-54-235-74-45.compute-1.amazonaws.com"
// LOCAL_PORT=8080
// REMOTE_IP="172.31.91.34"
// REMOTE_PORT=4020

// # ----------------------------
// # Crear directorio si no existe
// # ----------------------------
// mkdir -p "$DIR"

// # ----------------------------
// # Guardar clave PEM (¡IMPORTANTE: asegúrate de no compartir esto!)
// # ----------------------------
// cat > "$PRIVATE_KEY_PATH" << 'EOF'
// -----BEGIN RSA PRIVATE KEY-----
// MIIEpAIBAAKCAQEAwbP5rG4PTb0V135uLjlNPCWsDXTczHA0W8UxIk7mevV7Az4D
// 2yz7v+DnvmRvQF4/MuBtJ0GAqCNpCOwl0Npp8iW+eKqot42P26cdZ2Jw3Yeds7FL
// KXD2BGlaGowBZVnKaRnPPdayTmthsza9eWqJUlLhq+J9R/chUXYQIr8tVNUL/hGj
// AzNynWV+A4NNCQXWvxdjZGveAcvlADPAoARCMX0Vrnvh3UNKkim842KQA50teIaa
// 7oNhUQQ66sny+1v2GOqhcBo3V6JuW47qvjAx54FOKauYYzw/lbN1tEU/bqsPwKOe
// xiERroGc1Q0Za9B7H5k7g4u18lOTaplmQyeiewIDAQABAoIBAQCHxpHyLcuIYEwZ
// G0Q8HmpnCLkLTakfnF73HMgOFmQ0ODIb2bJ2RZfJreqDaH8bDXUbQnkAlUeLlBah
// 7HWtagvtckuK5YUR9Kar/v37Y+NdRRxjwpi+2bF48if4h77Kvh/FgBPmcsHVeiun
// pW022FidXf9VrpLGiRHPugQhdwRdeyg8R5lJnoXQED+S/znnbr65649p/X2ISmeH
// I/LPLUUX3tCbIM+FYcC/GGBQ1wNYT+XRikU5BXSzAsmFYpa/OKp6AQ2q/d2KikeB
// Z/oKXtVaK46T3jezeMOcuY4ItrLa4+arhZFA8F/M/oH6pxHVw08Cb44rroYJXLoI
// bZ1nK9ZxAoGBAOmZBwS6LSlZjetfnoRAFC0cksWDAMg/aYK0iNo7/h3UyDCupY0u
// +iCv/Hv8N9JyL0u6IFxZxijt1vd3v5g7J2+Bpt2phBrtGagWEVv6sh2xyLJqlhyx
// xhA8C1hh+NWwTovoEicbl9kHfJuMPzgKea/RTkY33speFZRPXvI0YnX/AoGBANRH
// gcbb7DhapTVhFVcNkvhOkaCO1il87RnxGj5MwHhkfJXEQcIbF3+tL10BS695DBRn
// KdTyxQMy3Ta+Gr+siWZr3e43pgM5o+FHVRSYqrIc82s2DqdGD7rZf+5R0K241xWF
// MuqM+ve70LSCDXZmyGU/kQa7OfqMTWckjEMO0auFAoGAOekE82gQQBsCcuJ+krys
// A878l9h1Pi9yQcPt1WRgCBczFdaGFi0aNzZJupb5Y8OI9BYNZbefx4/G5gyaw+uO
// SDd1HaijpmU3IhNudEX/GBt17L09v5lWx7mK+ns3TApsPoTm0yklCNmxS4KGPadj
// KXITHJdHNRYD9YODvzm7WxMCgYBQvLmxRqf7bw5y1O/m4jTJ2CgvJuRxdyA+w6K1
// mz+BCscPt0tDZkZzuwzOlNWScbmUcQBKC+O+qbPVREysJhVELTaFigjMJTodTqIf
// aUlS4Qv79N1x5YXKDTtJCzkROcIkXzrUVraFTpu8a9Ju+/yv9ZNVOhR9JKuz1QS7
// 5ID+eQKBgQDKxnHuIdB8oxkA+qwdsL4u9FyVZ+xL0xWNNm+/R5aBl9+flIrE5Rk6
// RL9lJKxwYlwGcp98YQlYgOsDMHY2zhRyRSGJeFsQErYj2o9ZibJdPLvgWjtwpbGf
// aA3ep9o+Uz3gmY4FbkJyOmoBEbpKeBp54XqjpYSktxixR3z2o0/0cA==
// -----END RSA PRIVATE KEY-----
// EOF

// # ----------------------------
// # Establecer permisos
// # ----------------------------
// chmod 600 "$PRIVATE_KEY_PATH"

// # ----------------------------
// # Crear túnel SSH
// # ----------------------------
// echo "Estableciendo túnel SSH..."

// ssh -o StrictHostKeyChecking=no -i "$PRIVATE_KEY_PATH" -f -L 0.0.0.0:$LOCAL_PORT:$REMOTE_IP:$REMOTE_PORT "$EC2_USER@$EC2_HOST" -N

// # ----------------------------
// # Verificar resultado
// # ----------------------------
// if [ $? -eq 0 ]; then
//   echo "✅ Túnel SSH establecido correctamente: http://localhost:$LOCAL_PORT"
// else
//   echo "❌ Error al establecer el túnel SSH."
// fi

// curl -X POST http://172.17.0.1:8080/translate -H "Content-Type: application/json" -d '{"Text": " Hello, how are you? My name is Mateo.", "Tgt_lang": "spa_Latn"}'
// curl -X POST http://localhost:8080/translate -H "Content-Type: application/json" -d '{"Text": " Hello, how are you? My name is Mateo.", "Tgt_lang": "spa_Latn"}'