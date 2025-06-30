class ApplicationController < ActionController::API
  before_action :authenticate_user, except: [:index, :show]


  private


  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last


    unless token
      Rails.logger.info "No Authorization token provided"
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end


    begin
      decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
      @current_user = User.find(decoded_token['user_id'])
      Rails.logger.info "Authenticated user ID: #{@current_user.id}"
    rescue JWT::DecodeError => e
      Rails.logger.info "JWT decode error: #{e.message}"
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    rescue ActiveRecord::RecordNotFound
      Rails.logger.info "User not found for decoded token"
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end


  def require_admin
    unless @current_user&.admin?
      render json: { error: 'Admin access required' }, status: :forbidden
      return
    end
  end
end
