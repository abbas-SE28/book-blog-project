class AuthController < ApplicationController
  skip_before_action :authenticate_user
  
  def register
    user = User.new(user_params)
    if user.save
      token = generate_token(user)
      render json: { user: user_response(user), token: token }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def login
  user = User.find_by(email: params[:email])
  if user&.authenticate(params[:password])
    token = generate_token(user)
    render json: { user: user_response(user), token: token }
  else
    render json: { error: 'Invalid credentials' }, status: :unauthorized
  end
end

  
  private
  
  def user_params
    params.require(:user).permit(:name, :username, :email, :password)
  end
  
  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
  end
  
  def user_response(user)
    { 
      user_id: user.id, 
      name: user.name, 
      username: user.username,
      email: user.email, 
      role: user.role || 'user'
    }
  end
end

