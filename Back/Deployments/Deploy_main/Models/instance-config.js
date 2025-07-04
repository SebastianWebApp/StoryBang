class InstanceConfig {
  constructor() {
    this.IPs = [
     "eipalloc-01d6b636d13c8c318",
     "eipalloc-0930e112bef84fd6b",
     "eipalloc-0f95740dcafa85b4c",
     "eipalloc-0f1be2bd760753a49",
     "eipalloc-0eccc3ff59b18a231",
     "arn:aws:elasticloadbalancing:us-east-1:746051747874:targetgroup/Orchestrator/4f20e4452f2415f4",
     "arn:aws:elasticloadbalancing:us-east-1:746051747874:targetgroup/Front/bc89cf8d650e69a5",
     "arn:aws:elasticloadbalancing:us-east-1:057055484007:targetgroup/JWT/acb1470168326d93",
     "arn:aws:elasticloadbalancing:us-east-1:057055484007:targetgroup/Encryption/fc04419b7f898ea7",
     "arn:aws:elasticloadbalancing:us-east-1:057055484007:targetgroup/Decryption/da08888ce2f16571",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Recover-Password/1bcddb165b0648d9",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Delete/975bdc82f0396dff",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Update/cf218817661ec9fa",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Read/9a866f899a69f473",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Check/bf6f89da5a74abc2",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Create/0a52d240a771e32c",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Verify/4cceb987a3f91077",
     "arn:aws:elasticloadbalancing:us-east-1:359246703158:targetgroup/Whatsapp/e47dc00e13a43485",
     "arn:aws:elasticloadbalancing:us-east-1:259723601489:targetgroup/Create/163a28659b60155e",
     "arn:aws:elasticloadbalancing:us-east-1:259723601489:targetgroup/Read/dad937ce33b9e422",
     "arn:aws:elasticloadbalancing:us-east-1:259723601489:targetgroup/Delete/507afb2b5ba599a3",
     "eipalloc-070395176d3456429",
     "eipalloc-02c769e67e8c1d2d8",
     "arn:aws:elasticloadbalancing:us-east-1:139424542086:targetgroup/Grok-Imagen/bda7a61e3cc49dd1",
     "arn:aws:elasticloadbalancing:us-east-1:139424542086:targetgroup/Grok-Descripcion/6e901c9bf444e2dd",
     "arn:aws:elasticloadbalancing:us-east-1:139424542086:targetgroup/Grok-Texto/6be8c1f28be1b73b",
     "eipalloc-0832622b6eaf5307f",
     "eipalloc-09aa5938c1f0439c8",
     "arn:aws:elasticloadbalancing:us-east-1:784664661569:targetgroup/Traductor/41409aa75c026282",
     "arn:aws:elasticloadbalancing:us-east-1:784664661569:targetgroup/GPT-Small/da9ccbc81453c731",
     "arn:aws:elasticloadbalancing:us-east-1:784664661569:targetgroup/GPT-Medium/eb0c46bfd8ba9db9",
     "eipalloc-0540791a0e19798cd",
     "arn:aws:elasticloadbalancing:us-east-1:816637959722:targetgroup/Create/2ab8450847673a79",
     "arn:aws:elasticloadbalancing:us-east-1:816637959722:targetgroup/Update/b5fa9d38fdbd82ef",
     "arn:aws:elasticloadbalancing:us-east-1:816637959722:targetgroup/Read/44590440173108f2",
     "arn:aws:elasticloadbalancing:us-east-1:816637959722:targetgroup/Read-Id/c7f508ff548f795d",
     "arn:aws:elasticloadbalancing:us-east-1:816637959722:targetgroup/Delete/3dda6993f81ce158"
    ];
    this.Names = [
      "Bull User", "Mysql", "Bull Code", "Kafka", "Messaging", "Orchestrator", "Front",
      "JWT", "Encryption", "Decryption", 
      "Recover Password", "Delete", "Update", "Read", "Check", "Create", "Verify", "Whatsapp",
      "Create", "Read", "Delete", "Bull Character", "MongoDB Character",
      "Grok-Image", "Grok-Description", "Grok-Text", "Bull Generator", "Bull Story",
      "Traductor", "GPT Small", "GPT Medium", "MongoDB Story",
      "Create", "Update", "Read", "Read-Id", "Delete"
    ];
    
    this.Instance = [
      "t2.large", "t2.large", "t2.large", "t2.large", "t2.large", "t2.large", "t2.large",
      "t2.large", "t2.micro", "t2.micro",
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro",
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro",
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro",
      "t2.large", "t2.large", "t2.large", "t2.large",
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro"
    ];
    this.Type = [
      "Elastic","Elastic","Elastic","Elastic","Elastic","Balancer","Balancer",
      "Balancer","Balancer","Balancer",
      "Balancer","Balancer","Balancer","Balancer","Balancer","Balancer","Balancer","Balancer",
      "Balancer","Balancer","Balancer","Elastic","Elastic",
      "Balancer","Balancer","Balancer","Elastic","Elastic",
      "Balancer","Balancer","Balancer","Elastic",
      "Balancer","Balancer","Balancer","Balancer","Balancer"
    ];
    this.Port_Target = [
      0, 0, 0, 0, 0, 4027, 80,
      4012, 4005, 4006,
      4010, 4011, 4008, 4007, 4001, 4004, 4009, 4002,
      4016, 4018, 4017, 0, 0,
      4013, 4015, 4014, 0, 0,
      4020, 4019, 4021, 0,
      4022, 4024, 4026, 4023, 4025
    ];
    this.SecurityGroupIds = [
      "sg-0bed85e8e281baf86","sg-0bed85e8e281baf86","sg-0bed85e8e281baf86","sg-0bed85e8e281baf86","sg-0bed85e8e281baf86","sg-0bed85e8e281baf86","sg-0bed85e8e281baf86",
      "sg-0bc03e98cfd39bc25", "sg-0bc03e98cfd39bc25", "sg-0bc03e98cfd39bc25",
      "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03", "sg-0f61fe70fbd652b03",
      "sg-0e1c7b3d450914b50", "sg-0e1c7b3d450914b50", "sg-0e1c7b3d450914b50", "sg-0e1c7b3d450914b50", "sg-0e1c7b3d450914b50", 
      "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", 
      "sg-055305fa9925064bd", "sg-055305fa9925064bd", "sg-055305fa9925064bd", "sg-055305fa9925064bd", 
      "sg-0cc8ed99ed8a40cb8", "sg-0cc8ed99ed8a40cb8", "sg-0cc8ed99ed8a40cb8", "sg-0cc8ed99ed8a40cb8", "sg-0cc8ed99ed8a40cb8"
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
          KAFKA_ADVERTISED_HOST_NAME: 52.7.153.157
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
        -p 80:80 \
        --restart always \
        sebastianwebapp/story_bang_frontend_main:latest

    # Tunel
    ssh -p 443 -R0:127.0.0.1:80 -L4300:127.0.0.1:4300 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 86ySMQc3n7w@pro.pinggy.io
    
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

    # Contenedor story_bang_translator_main
    docker pull sebastianwebapp/story_bang_translator_main:latest

    docker stop story_bang_translator_main || true
    docker rm story_bang_translator_main || true

    docker run -d --name story_bang_translator_main \
        -p 4020:4020 \
        --restart always \
        sebastianwebapp/story_bang_translator_main:latest

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