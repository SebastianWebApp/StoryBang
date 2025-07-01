# server.rb

require 'sinatra'
require 'json'
require 'graphql'
require 'dotenv/load'
require_relative './config/environment'
require_relative './app/base_decryptor'
require_relative './app/validation_decorator'
require_relative './app/aes_decryptor'
require_relative './api/graphql_schema'

# Instancia el decorador principal para desencriptar
$decryptor = AESDecryptor.new(ValidationDecorator.new(BaseDecryptor.new))

# Middleware CORS dinámico
before do
  origin = request.env['HTTP_ORIGIN']
  if ALLOWED_ORIGINS.include?(origin) || ALLOWED_ORIGINS.include?('*')
    response.headers['Access-Control-Allow-Origin'] = origin || '*'
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

# Endpoint para verificar que el servidor está corriendo
get '/' do
  'Decrypt microservice is running!'
end

set :bind, '0.0.0.0'
set :port, 4006