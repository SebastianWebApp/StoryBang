class InstanceConfig {
  constructor() {
    this.IPs = [
      "eipalloc-00e8e9dc4e1ed1202",
      "eipalloc-0bd56900b37bf693b",
      "eipalloc-05dac3d600bf28995",
      "arn:aws:elasticloadbalancing:us-east-1:747763450211:targetgroup/Login1-Encriptacion/f6da01d9afe572ff",
      "arn:aws:elasticloadbalancing:us-east-1:747763450211:targetgroup/Login2-Desencriptado/5001e3484f83d872",
      "arn:aws:elasticloadbalancing:us-east-1:747763450211:targetgroup/Front/7b27eb79e59e40ae",
      "arn:aws:elasticloadbalancing:us-east-1:747763450211:targetgroup/Personajes/6c94923d037ad31a"

    ];
    this.Names = ["Base_Datos", "Mensajeria", "Seguridad", "Login1_Encriptacion", "Login2-Desencriptado", "Front-Grok", "Personajes"];
    
    this.Instance = [
      "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro", "t2.micro"
      
     
    ];
    this.Type = ["Elastic","Elastic","Elastic","Balancer","Balancer","Balancer","Balancer"];
    this.Port_Target = [0, 0, 0, 4004, 4009, 80, 4016];
    this.SecurityGroupIds = [
      "sg-07949c21821a92579","sg-07949c21821a92579","sg-07949c21821a92579","sg-07949c21821a92579","sg-07949c21821a92579","sg-07949c21821a92579","sg-07949c21821a92579"
  
    
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
          KAFKA_ADVERTISED_HOST_NAME: 54.82.185.50
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
      UserData: Buffer.from(this.Scripts[index]).toString('base64')
    };
  }
}

export default InstanceConfig;