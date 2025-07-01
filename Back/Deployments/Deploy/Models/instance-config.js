class InstanceConfig {
  constructor() {
    this.IPs = [
      "eipalloc-085234d31e72b6555",
      "eipalloc-031d6d160cba99a34",
      "eipalloc-09b0e6223b679c2f3",
      "arn:aws:elasticloadbalancing:us-east-1:922508574576:targetgroup/Login1-Encriptacion/dd3bada8c31fe4f4",
      "arn:aws:elasticloadbalancing:us-east-1:922508574576:targetgroup/Login2-Desencriptado/e66b020b0b79bc0f",
      "arn:aws:elasticloadbalancing:us-east-1:922508574576:targetgroup/Front-Grok/1997ede6ceab911f",
      "arn:aws:elasticloadbalancing:us-east-1:922508574576:targetgroup/Personajes/c62a123272b036ec",
      "arn:aws:elasticloadbalancing:us-east-1:922508574576:targetgroup/Story/aefd2d0f1cb9d764",
      "eipalloc-0bfdb80ef52332267",
      "eipalloc-0f4f05781df5b5867",
      "eipalloc-0dcf14a053f6faaef"

    ];
    this.Names = ["Base_Datos", "Mensajeria", "Seguridad", "Login1-Encriptacion", "Login2-Desencriptado", "Front-Grok", "Personajes", "Story", "Gpt2-Medium", "Gpt2-Small", "Traductor"];
    
    this.Instance = [
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.large", "t2.large"
      , "t2.large"
      
     
    ];
    this.Type = ["Elastic","Elastic","Elastic","Balancer","Balancer","Balancer","Balancer","Balancer","Elastic","Elastic","Elastic"];
    this.Port_Target = [0, 0, 0, 4004, 4009, 80, 4016, 4022, 0, 0, 0];
    this.SecurityGroupIds = [
      "sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4","sg-0d219f420a5dd84d4"
    ,"sg-0d219f420a5dd84d4","sg-0be93f17d1c27e213","sg-0be93f17d1c27e213"
    
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
          KAFKA_ADVERTISED_HOST_NAME: 34.192.81.35
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
      

    # Contenedor story_bang_frontend_qa
    docker pull sebastianwebapp/story_bang_frontend_qa:latest
    
    docker stop story_bang_frontend_qa || true
    docker rm story_bang_frontend_qa || true
    
    docker run -d --name story_bang_frontend_qa \
        -p 80:80 \
        --restart always \
        sebastianwebapp/story_bang_frontend_qa:latest



    # Contenedor story_bang_create_user_qa
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


    # Contenedor story_bang_orchestrator_qa
    docker pull sebastianwebapp/story_bang_orchestrator_qa:latest
    
    docker stop story_bang_orchestrator_qa || true
    docker rm story_bang_orchestrator_qa || true
    
    docker run -d --name story_bang_orchestrator_qa \
        -p 4027:4027 \
        --restart always \
        sebastianwebapp/story_bang_orchestrator_qa:latest

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