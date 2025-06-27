require 'sinatra'
require 'json'
require 'base64'
require 'openssl'
require 'graphql'
require 'dotenv/load'

# Configuración base
KEY = ENV['AES_KEY'] || "12345678901234567890123456789012" # 32 bytes
IV  = ENV['AES_IV']  || "1234567890123456"                  # 16 bytes
ALLOWED_ORIGINS = (ENV['CORS_ORIGIN'] || "*").split(',')

# Componente base para desencriptación
class BaseDecryptor
  def decrypt(data)
    data
  end
end

# Decorador para desencriptación AES
class AESDecryptor < BaseDecryptor
  def initialize(component)
    @component = component
  end

  def decrypt(cipher_base64)
    raise "AES key must be 32 bytes" unless KEY.bytesize == 32
    raise "IV must be 16 bytes" unless IV.bytesize == 16

    cipher = OpenSSL::Cipher.new('AES-256-CFB')
    cipher.decrypt
    cipher.key = KEY
    cipher.iv = IV

    encrypted_data = Base64.decode64(cipher_base64)
    decrypted = cipher.update(encrypted_data) + cipher.final
    decrypted.force_encoding('UTF-8')
    
    result = decrypted.valid_encoding? ? decrypted : Base64.strict_encode64(decrypted)
    @component.decrypt(result)
  rescue OpenSSL::Cipher::CipherError => e
    raise "Error during decryption: #{e.message}"
  end
 end

# Decorador para validación
class ValidationDecorator < BaseDecryptor
  def initialize(component)
    @component = component
  end

  def decrypt(data)
    raise "Data cannot be empty" if data.nil? || data.empty?
    @component.decrypt(data)
  end
end

# Configuración del desencriptador
$decryptor = AESDecryptor.new(ValidationDecorator.new(BaseDecryptor.new))

# Schema GraphQL
class DecryptType < GraphQL::Schema::Object
  field :phone, String, null: false
  field :password, String, null: false
end

class MutationType < GraphQL::Schema::Object
  field :decrypt, DecryptType, null: false do
    argument :phone, String, required: true
    argument :password, String, required: true
  end

  def decrypt(phone:, password:)
    {
      phone: $decryptor.decrypt(phone),
      password: $decryptor.decrypt(password)
    }
  end
end

class Schema < GraphQL::Schema
  mutation(MutationType)
end


# Middleware CORS dinámico
before do
  origin = request.env['HTTP_ORIGIN']
  if ALLOWED_ORIGINS.include?(origin)
    response.headers['Access-Control-Allow-Origin'] = origin
  end

  response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

options '*' do
  200
end

# Endpoint GraphQL
post '/' do
  content_type :json
  begin
    data = JSON.parse(request.body.read)
    result = Schema.execute(
      data['query'],
      variables: data['variables']
    )
    result.to_json
  rescue JSON::ParserError => e
    status 400
    { error: "Invalid JSON: #{e.message}" }.to_json
  rescue StandardError => e
    status 500
    { error: "Server error: #{e.message}" }.to_json
  end
end

set :bind, '0.0.0.0'
set :port, 4006