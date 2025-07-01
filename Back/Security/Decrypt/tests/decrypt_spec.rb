require_relative '../app/base_decryptor'
require_relative '../app/validation_decorator'
require_relative '../app/aes_decryptor'
require_relative '../config/environment'
require 'openssl'
require 'base64'

RSpec.describe AESDecryptor do
  let(:plain_text) { "test1234" }
  let(:component) { ValidationDecorator.new(BaseDecryptor.new) }
  let(:aes_decryptor) { AESDecryptor.new(component) }

  def encrypt(text)
    cipher = OpenSSL::Cipher.new('AES-256-CFB')
    cipher.encrypt
    cipher.key = KEY
    cipher.iv = IV
    encrypted = cipher.update(text) + cipher.final
    Base64.strict_encode64(encrypted)
  end

  it "decrypts a valid encrypted string" do
    encrypted = encrypt(plain_text)
    result = aes_decryptor.decrypt(encrypted)
    expect(result).to eq(plain_text)
  end

  it "raises error if data is empty" do
    expect { aes_decryptor.decrypt("") }.to raise_error("Data cannot be empty")
  end

  it "raises error if key or iv is invalid" do
  stub_const("KEY", "shortkey")
  expect {
    aes_decryptor.decrypt("cualquier cosa")
  }.to raise_error(RuntimeError, /key must be 32 bytes/)
  end
end