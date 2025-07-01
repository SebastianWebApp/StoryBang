require_relative 'base_decryptor'

class ValidationDecorator < BaseDecryptor
  def initialize(component)
    @component = component
  end

  def decrypt(data)
    raise "Data cannot be empty" if data.nil? || data.empty?
    @component.decrypt(data)
  end
end