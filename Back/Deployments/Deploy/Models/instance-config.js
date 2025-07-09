class InstanceConfig {
  constructor() {
    this.IPs = [
      "eipalloc-04cc1a7396438fb4b",
      "eipalloc-0f3e50fc4d9c42734",
      "eipalloc-0a5cd485fab963463",
      "eipalloc-0807fea916d56cd04",
      "eipalloc-0018e9c4737a70979",
      "eipalloc-0f7464ac6a1b15313",
      "eipalloc-076207e89e8b910e8",
      "eipalloc-069869ea35705ff1e",
      "eipalloc-001bf56d560b87e0f",
      "eipalloc-0f58fcac9222a6e96",
      "eipalloc-0ccb12e4a2cf2e1b3",
      "eipalloc-068bd46923d12b123"

    ];
    this.Names = ["Base_Datos", "Seguridad", "Mensajeria", "Login1-Encriptacion", "Login2-Desencriptado", "Personajes", "Story", "Gpt2-Medium", "Gpt2-Small", "Traductor", "Bastion", "Front-Orquestador"];
    
    this.Instance = ["t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.large", "t2.large", "t2.large", "t2.micro", "t2.micro"];
    this.Type = ["Elastic","Elastic","Elastic", "Elastic", "Elastic", "Elastic", "Elastic", "Elastic", "Elastic", "Elastic", "Elastic", "Elastic"];
    this.Port_Target = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.SecurityGroupIds = [
      "sg-055305fa9925064bd", "sg-055305fa9925064bd", "sg-055305fa9925064bd", "sg-055305fa9925064bd", "sg-055305fa9925064bd", 
      "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", "sg-057a019caa7fbcb25", 
      "sg-001fc4cc1583e27c0", "sg-08dfe999036463fa3", "sg-0e1c7b3d450914b50"
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
        
        
    # Contenedor story_bang_mysql_structure_qa
    docker pull sebastianwebapp/story_bang_mysql_structure_qa:latest
    
    docker stop story_bang_mysql_structure_qa || true
    docker rm story_bang_mysql_structure_qa || true
    
    docker run -d --name story_bang_mysql_structure_qa \
        -p 4000:4000 \
        --restart no \
        sebastianwebapp/story_bang_mysql_structure_qa:latest
        

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
    
        
    # Contenedor story_bang_encrypt
    docker pull sebastianwebapp/story_bang_encrypt_qa:latest
    
    docker stop story_bang_encrypt || true
    docker rm story_bang_encrypt || true
    
    docker run -d --name story_bang_encrypt \
        -p 4005:4005 \
        --restart always \
        sebastianwebapp/story_bang_encrypt_qa:latest
        
    # Contenedor story_bang_decrypt
    docker pull sebastianwebapp/story_bang_decrypt_qa:latest
    
    docker stop story_bang_decrypt || true
    docker rm story_bang_decrypt || true
    
    docker run -d --name story_bang_decrypt \
        -p 4006:4006 \
        --restart always \
        -e RACK_ENV=production \
        sebastianwebapp/story_bang_decrypt_qa:latest


    # Contenedor story_bang_jwt
    docker pull sebastianwebapp/story_bang_jwt_qa:latest
    
    docker stop story_bang_jwt || true
    docker rm story_bang_jwt || true
    
    docker run -d --name story_bang_jwt \
        -p 4012:4012 \
        --restart always \
        sebastianwebapp/story_bang_jwt_qa:latest
        
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
          KAFKA_ADVERTISED_HOST_NAME: 3.227.186.60
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
    

    # Contenedor messages_user
    docker pull sebastianwebapp/story_bang_messages_user_qa:latest
    
    docker stop messages_user || true
    docker rm messages_user || true
    
    docker run -d --name messages_user \
        -p 4003:4003 \
        --restart always \
        sebastianwebapp/story_bang_messages_user_qa:latest


    # Step 11: Verify containers are running
    echo "Verificando contenedores en ejecución..."
    docker ps
        
    # Step 12: Create SSH tunnel
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
      

    # Contenedor story_bang_create_user_qa
    docker pull sebastianwebapp/story_bang_create_user_qa:latest
    
    docker stop story_bang_create_user_qa || true
    docker rm story_bang_create_user_qa || true
    
    docker run -d --name story_bang_create_user_qa \
        -p 4004:4004 \
        --restart always \
        sebastianwebapp/story_bang_create_user_qa:latest
        

    # Contenedor story_bang_delete_user_qa
    docker pull sebastianwebapp/story_bang_delete_user_qa:latest
    
    docker stop story_bang_delete_user_qa || true
    docker rm story_bang_delete_user_qa || true
    
    docker run -d --name story_bang_delete_user_qa \
        -p 4011:4011 \
        --restart always \
        sebastianwebapp/story_bang_delete_user_qa:latest
        
  

    # Contenedor story_bang_update_user_qa
    docker pull sebastianwebapp/story_bang_update_user_qa:latest
    
    docker stop story_bang_update_user_qa || true
    docker rm story_bang_update_user_qa || true
    
    docker run -d --name story_bang_update_user_qa \
        -p 4008:4008 \
        --restart always \
        sebastianwebapp/story_bang_update_user_qa:latest
        


    # Contenedor story_bang_verification_qa
    docker pull sebastianwebapp/story_bang_verification_qa:latest
    
    docker stop story_bang_verification_qa || true
    docker rm story_bang_verification_qa || true
    
    docker run -d --name story_bang_verification_qa \
        -p 4001:4001 \
        --restart always \
        sebastianwebapp/story_bang_verification_qa:latest
        
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
      

    # Contenedor story_bang_password_recovery_qa
    docker pull sebastianwebapp/story_bang_password_recovery_qa:latest
    
    docker stop story_bang_password_recovery_qa || true
    docker rm story_bang_password_recovery_qa || true
    
    docker run -d --name story_bang_password_recovery_qa \
        -p 4010:4010 \
        --restart always \
        sebastianwebapp/story_bang_password_recovery_qa:latest
        

    # Contenedor story_bang_read_user_qa
    docker pull sebastianwebapp/story_bang_read_user_qa:latest
    
    docker stop story_bang_read_user_qa || true
    docker rm story_bang_read_user_qa || true
    
    docker run -d --name story_bang_read_user_qa \
        -p 4007:4007 \
        --restart always \
        sebastianwebapp/story_bang_read_user_qa:latest
        
  

    # Contenedor story_bang_verify_user_qa
    docker pull sebastianwebapp/story_bang_verify_user_qa:latest
    
    docker stop story_bang_verify_user_qa || true
    docker rm story_bang_verify_user_qa || true
    
    docker run -d --name story_bang_verify_user_qa \
        -p 4009:4009 \
        --restart always \
        sebastianwebapp/story_bang_verify_user_qa:latest
        


    # Contenedor story_bang_whatsapp_qa
    docker pull sebastianwebapp/story_bang_whatsapp_qa:latest
    
    docker stop story_bang_whatsapp_qa || true
    docker rm story_bang_whatsapp_qa || true
    
    docker run -d --name story_bang_whatsapp_qa \
        -p 4002:4002 \
        --restart always \
        sebastianwebapp/story_bang_whatsapp_qa:latest
    

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
      

    # Contenedor story_bang_create_character_qa
    docker pull sebastianwebapp/story_bang_create_character_qa:latest
    
    docker stop story_bang_create_character_qa || true
    docker rm story_bang_create_character_qa || true
    
    docker run -d --name story_bang_create_character_qa \
        -p 4016:4016 \
        --restart always \
        sebastianwebapp/story_bang_create_character_qa:latest



    # Contenedor story_bang_delete_character_qa
    docker pull sebastianwebapp/story_bang_delete_character_qa:latest
    
    docker stop story_bang_delete_character_qa || true
    docker rm story_bang_delete_character_qa || true
    
    docker run -d --name story_bang_delete_character_qa \
        -p 4017:4017 \
        --restart always \
        sebastianwebapp/story_bang_delete_character_qa:latest



    # Contenedor story_bang_read_character_qa
    docker pull sebastianwebapp/story_bang_read_character_qa:latest
    
    docker stop story_bang_read_character_qa || true
    docker rm story_bang_read_character_qa || true
    
    docker run -d --name story_bang_read_character_qa \
        -p 4018:4018 \
        --restart always \
        sebastianwebapp/story_bang_read_character_qa:latest

    # Contenedor story_bang_grok_description_image_qa
    docker pull sebastianwebapp/story_bang_grok_description_image_qa:latest
    
    docker stop story_bang_grok_description_image_qa || true
    docker rm story_bang_grok_description_image_qa || true
    
    docker run -d --name story_bang_grok_description_image_qa \
        -p 4015:4015 \
        --restart always \
        sebastianwebapp/story_bang_grok_description_image_qa:latest



    # Contenedor story_bang_grok_image_generator_qa
    docker pull sebastianwebapp/story_bang_grok_image_generator_qa:latest
    
    docker stop story_bang_grok_image_generator_qa || true
    docker rm story_bang_grok_image_generator_qa || true
    
    docker run -d --name story_bang_grok_image_generator_qa \
        -p 4013:4013 \
        --restart always \
        sebastianwebapp/story_bang_grok_image_generator_qa:latest



    # Contenedor story_bang_grok_text_generator_qa
    docker pull sebastianwebapp/story_bang_grok_text_generator_qa:latest
    
    docker stop story_bang_grok_text_generator_qa || true
    docker rm story_bang_grok_text_generator_qa || true
    
    docker run -d --name story_bang_grok_text_generator_qa \
        -p 4014:4014 \
        --restart always \
        sebastianwebapp/story_bang_grok_text_generator_qa:latest
    

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
      

    # Contenedor story_bang_create_story_qa
    docker pull sebastianwebapp/story_bang_create_story_qa:latest
    
    docker stop story_bang_create_story_qa || true
    docker rm story_bang_create_story_qa || true
    
    docker run -d --name story_bang_create_story_qa \
        -p 4022:4022 \
        --restart always \
        sebastianwebapp/story_bang_create_story_qa:latest



    # Contenedor story_bang_delete_story_qa
    docker pull sebastianwebapp/story_bang_delete_story_qa:latest
    
    docker stop story_bang_delete_story_qa || true
    docker rm story_bang_delete_story_qa || true
    
    docker run -d --name story_bang_delete_story_qa \
        -p 4025:4025 \
        --restart always \
        sebastianwebapp/story_bang_delete_story_qa:latest



    # Contenedor story_bang_read_id_story_qa
    docker pull sebastianwebapp/story_bang_read_id_story_qa:latest
    
    docker stop story_bang_read_id_story_qa || true
    docker rm story_bang_read_id_story_qa || true
    
    docker run -d --name story_bang_read_id_story_qa \
        -p 4023:4023 \
        --restart always \
        sebastianwebapp/story_bang_read_id_story_qa:latest


    # Contenedor story_bang_read_story_qa
    docker pull sebastianwebapp/story_bang_read_story_qa:latest
    
    docker stop story_bang_read_story_qa || true
    docker rm story_bang_read_story_qa || true
    
    docker run -d --name story_bang_read_story_qa \
        -p 4026:4026 \
        --restart always \
        sebastianwebapp/story_bang_read_story_qa:latest




    # Contenedor story_bang_update_story_qa
    docker pull sebastianwebapp/story_bang_update_story_qa:latest
    
    docker stop story_bang_update_story_qa || true
    docker rm story_bang_update_story_qa || true
    
    docker run -d --name story_bang_update_story_qa \
        -p 4024:4024 \
        --restart always \
        sebastianwebapp/story_bang_update_story_qa:latest

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
      

    # Contenedor story_bang_gpt2medium_text_generator_qa
    docker pull sebastianwebapp/story_bang_gpt2medium_text_generator_qa:latest
    
    docker stop story_bang_gpt2medium_text_generator_qa || true
    docker rm story_bang_gpt2medium_text_generator_qa || true
    
    docker run -d --name story_bang_gpt2medium_text_generator_qa \
        -p 4021:4021 \
        -v /home/ubuntu/story_model:/app/story_model \
        --restart always \
        sebastianwebapp/story_bang_gpt2medium_text_generator_qa:latest


   

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
      

    # Contenedor story_bang_gpt2_text_generator_qa
    docker pull sebastianwebapp/story_bang_gpt2_text_generator_qa:latest
    
    docker stop story_bang_gpt2_text_generator_qa || true
    docker rm story_bang_gpt2_text_generator_qa || true
    
    docker run -d --name story_bang_gpt2_text_generator_qa \
        -p 4019:4019 \
        -v /home/ubuntu/story_model:/app/story_model \
        --restart always \
        sebastianwebapp/story_bang_gpt2_text_generator_qa:latest

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

# Contenedor story_bang_translator_qa
docker pull sebastianwebapp/story_bang_translator_qa:latest

docker stop story_bang_translator_qa || true
docker rm story_bang_translator_qa || true

docker run -d --name story_bang_translator_qa \
    -p 4020:4020 \
    --restart always \
    sebastianwebapp/story_bang_translator_qa:latest

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
      

    # Contenedor story_bang_frontend_qa
    docker pull sebastianwebapp/story_bang_frontend_qa:latest
    
    docker stop story_bang_frontend_qa || true
    docker rm story_bang_frontend_qa || true
    
    docker run -d --name story_bang_frontend_qa \
        -p 80:80 \
        --restart always \
        sebastianwebapp/story_bang_frontend_qa:latest

    # Contenedor story_bang_orchestrator_qa
    docker pull sebastianwebapp/story_bang_orchestrator_qa:latest
    
    docker stop story_bang_orchestrator_qa || true
    docker rm story_bang_orchestrator_qa || true
    
    docker run -d --name story_bang_orchestrator_qa \
        -p 4027:4027 \
        --restart always \
        sebastianwebapp/story_bang_orchestrator_qa:latest
        
    
      `,

 
    ];
  }

  getInstanceParams(index) {
    return {
      ImageId: "ami-0731becbf832f281e",
      InstanceType: this.Instance[index],
      MinCount: 1,
      MaxCount: 1,
      KeyName: "Distribuida1",
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
// EC2_HOST="ec2-52-3-112-245.compute-1.amazonaws.com"
// LOCAL_PORT=8080
// REMOTE_IP="172.31.82.147"
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
// MIIEogIBAAKCAQEA/or9umTLk5jQZ4e1Ff4ZyWj/fD8OhsPQxPkwvNjL4Q0054BJ
// RB4C0tv87TNdbznxXlASyfYCXmX2JCiOoT1oPdjKCnUeSkycK3yO/tdpJBGJ+3pF
// 0ATHRDAfuqMUVMrZcmpEHS91sRv+8gMKGjGei/gpXlv90IAzB3hiqm82yUe2BkZ3
// qh+QpViOSVcWJgmqLX73dUOYsokqP5oGK3mB36agQx1lRVy6hOdayVQ9u6QFbjZf
// AnvIvn4TyTIlgckNwB1ixFx+eXzRdnYqyyagRSZxuvEuWchttwLIoi3PBXjctdSH
// Bja9/0PWQolRTLMGAeqJxtfeqLIeDP0vQKo5VwIDAQABAoIBAGIT5BgB5n8EjqiV
// nazPr9fvYSHamhpLMRH0glcBoe0hTZU11QUuGyBsK1SqSgIlbV9Nsy+mXttIpkLg
// bbSrGJNcCN1mqzkts67924tOLPD84RHI10WD0dPwRwl+9MKHNqnjUEN+mfaYNu/B
// RA87tz9va2E0SOQhwYfLVxkcqRt8hWprWnluONZG3zN75MUSDlnucQ7ZEqv9+FXM
// yl1dQZvyuMfKN4w092RbOm7iKMExI5GCZUiKlSdF4iWrrdRm4V+NvBExwell7DtH
// Li+TdfK4N2UEkkrxhI5L3nw8DCnYmoOICRNHuyN0WKDhEa6dahb7eq7lxVoAyv3W
// FVG7juECgYEA/1h7jU/9HsURjpB6J5aNoyQjbUlrLcWKMUVw/5HjW2PoHAjnIbbO
// +snIdJ+K6v9RsIINu6IMV34pE4aOBJ9lRN9JUZK450nkL69Gb3wl9ojZBd1ZWg7l
// H/T4zNhfXb57sUI/2mMZBItNPaSepPbBsFUbmdyrx6VDzkcm05ScQb0CgYEA/zH7
// XXgYSLYlxcAhgF971KGo9llSgIdeOV/5F7DTg8eSWUx4Xn+07O6igAimaYgxriYg
// iklIK+4vWuWZGoRYIOPrWPCd7CY7Be1upwFKKr9cxNKQQNAFAcROOS6M8rz8O8Bw
// qKEpVo6HkOZS8ezDDv19Smao8dSILFhMKwMwtqMCgYB/OQnOHbWC+DNIMen7AYMu
// bpoMIJF7K7ov1GZ5n6mE5mFGXpUycg/sWk869CbV8UI1TIclHpdBnIVAykDGQtjF
// GO9B6nWgH2vG6nCQqW2MySBAUMntGhDE/FxeS8wwO/ELH3QLDmbvoaxpczTsAln8
// zlrDLXSVM112UHMi5h94jQKBgDTGMFZvDI6U5JDVn9f9Zw1c9SUk6bPcyraQy2GD
// 1uoMro47CzV3sYHCA+b4Yvm2CZgbGGWgrAUxt6dTjer27Ya3u6bj87SvX0tlg5mT
// 4bOfaV7msKBGpJJt90NKBin4vSzaKjIlSfg1d4GWsBaJwPjroSpuuodwTUzmYbIP
// cdaDAoGAVT9JAlD5ZvlQ9TQGlira7lbhyPgHTgVLneaO3133UiAFecTQd4GaHGJe
// XcdBZ1M/vOg2jvWpewg/1oRU6Nm/vjaTjnHbv3vKAxLM6vkxF/3spCv0+TwZyMXO
// A9dzydZ6fUZPe/CfuLLsW0Sizo+mxSBSdF+wRXl32XTD7ibzu/M=
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