source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2' # or your Ruby version

gem 'rails', '~> 7.0.0'
gem 'pg', '~> 1.5.9'
gem 'puma', '~> 7.0'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'devise'
gem 'devise-jwt'
gem 'rack-cors'
gem 'image_processing', '~> 1.2'
gem 'bcrypt', '~> 3.1.7'
gem 'sprockets-rails'
gem 'jwt'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'spring'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]