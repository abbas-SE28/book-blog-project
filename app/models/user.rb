class User < ApplicationRecord
  has_secure_password
  has_many :comments, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :name, presence: true
  
  enum role: { user: 0, admin: 1 }
end
