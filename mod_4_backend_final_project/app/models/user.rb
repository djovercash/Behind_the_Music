class User < ApplicationRecord
  has_many :clips
  has_secure_password
end
