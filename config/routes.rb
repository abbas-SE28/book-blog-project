Rails.application.routes.draw do
  post '/auth/register', to: 'auth#register'
  post '/auth/login', to: 'auth#login'
  
  resources :categories
  resources :books do
    resources :comments, only: [:create, :destroy]
  end
  get '/health', to: proc {[200,{}, ['OK']]}
end
