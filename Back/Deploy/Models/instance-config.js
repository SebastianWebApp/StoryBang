class InstanceConfig {
  constructor() {
    this.IPs = [
      "eipalloc-09e64f4fb319a36cb",
      "eipalloc-038350a108b99614d",
      "eipalloc-05a5d393dc6482d39",
      "eipalloc-09feafc7f5101d409",
      "eipalloc-0634b05b86f457a0d",
      "arn:aws:elasticloadbalancing:us-east-1:168562793459:targetgroup/Encrypt/03fde7ca8ff21f9e",
      "arn:aws:elasticloadbalancing:us-east-1:168562793459:targetgroup/Decrypt/7e50e9d06d835270",
      "eipalloc-09b0e6223b679c2f3",
      "arn:aws:elasticloadbalancing:us-east-1:168562793459:targetgroup/Whatsapp/4627f9c669384ca7"
    ];
    this.Names = ["DB_User", "DB_Code", "Bull_User", "Messages_user", "Kafka", "Encrypt", "Decrypt","JWT", "Whatsapp"];
    this.Instance = [
      "t2.micro",
      "t2.micro",
      "t2.micro",
      "t2.micro",
      "t2.micro",
      "t2.micro",
      "t2.micro",
      "t2.micro",
      "t2.micro"
    ];
    this.Type = ["Elastic", "Elastic", "Elastic", "Elastic", "Elastic", "Balancer", "Balancer", "Elastic", "Balancer"];
    this.Port_Target = [0, 0, 0, 0, 0, 4005, 4006, 0, 4002];
    this.SecurityGroupIds = [
      "sg-04371dba8d4161b49",
      "sg-04371dba8d4161b49",
      "sg-04371dba8d4161b49",
      "sg-04371dba8d4161b49",
      "sg-04371dba8d4161b49",
      "sg-04371dba8d4161b49",
      "sg-04371dba8d4161b49",
      "sg-0b41dd15864a8060f"];
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
        
        
    # Contenedor mysql_structure
    docker pull sebastianwebapp/story_bang_mysql_structure:latest
    
    docker stop mysql_structure || true
    docker rm mysql_structure || true
    
    docker run -d --name mysql_structure \
        -p 4000:4000 \
        --restart no \
        sebastianwebapp/story_bang_mysql_structure:latest
        
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
    
        
    # Contenedor messages_user
    docker pull sebastianwebapp/story_bang_messages_user:latest
    
    docker stop messages_user || true
    docker rm messages_user || true
    
    docker run -d --name messages_user \
        -p 4003:4003 \
        --restart always \
        sebastianwebapp/story_bang_messages_user:latest
        
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
          KAFKA_ADVERTISED_HOST_NAME: 54.243.52.244
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
    
    # Step 11: Verify containers are running
    echo "Verificando contenedores en ejecución..."
    docker ps`,
    
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
    docker pull sebastianwebapp/story_bang_encrypt:latest
    
    docker stop story_bang_encrypt || true
    docker rm story_bang_encrypt || true
    
    docker run -d --name story_bang_encrypt \
        -p 4005:4005 \
        --restart always \
        sebastianwebapp/story_bang_encrypt:latest
        
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
    docker pull sebastianwebapp/story_bang_decrypt:latest
    
    docker stop story_bang_decrypt || true
    docker rm story_bang_decrypt || true
    
    docker run -d --name story_bang_decrypt \
        -p 4006:4006 \
        --restart always \
        -e RACK_ENV=production \
        sebastianwebapp/story_bang_decrypt:latest
        
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
    docker pull sebastianwebapp/story_bang_jwt:latest
    
    docker stop story_bang_jwt || true
    docker rm story_bang_jwt || true
    
    docker run -d --name story_bang_jwt \
        -p 4012:4012 \
        --restart always \
        sebastianwebapp/story_bang_jwt:latest
        
        `,

    //      `#!/bin/bash
    
    // # Actualizar el sistema
    // sudo apt update -y && sudo apt upgrade -y
    
    // # Instalar Docker
    // sudo apt install -y docker.io
    
    // # Iniciar y habilitar Docker
    // sudo systemctl start docker
    // sudo systemctl enable docker
    
    // # Agregar el usuario al grupo Docker para evitar usar sudo con cada comando Docker
    // sudo usermod -aG docker $USER
    
    // # Configurar permisos para el socket Docker
    // sudo chmod 666 /var/run/docker.sock
    
        
    // # Contenedor story_bang_whatsapp
    // docker pull sebastianwebapp/story_bang_whatsapp:latest
    
    // docker stop story_bang_whatsapp || true
    // docker rm story_bang_whatsapp || true
    
    // docker run -d --name story_bang_whatsapp \
    //     -p 4002:4002 \
    //     --restart always \
    //     sebastianwebapp/story_bang_whatsapp:latest
        
    //     `,
    
    ];
  }

  getInstanceParams(index) {
    return {
      ImageId: "ami-0731becbf832f281e",
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
      UserData: Buffer.from(this.Scripts[index]).toString('base64')
    };
  }
}

export default InstanceConfig;