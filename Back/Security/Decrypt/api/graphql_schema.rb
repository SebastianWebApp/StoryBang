require 'graphql'

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