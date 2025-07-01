require_relative 'base_decryptor'
require 'openssl'
require 'base64'
require_relative '../config/environment'

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