# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# db/seeds.rb
#when adding a book this is the categories

categories = [
  'Fiction',
  'Science',
  'Mathematics',
  'Philosophy',
  'History',
  'Technology',
  'Art',
  'Biography',
  'Fantasy',
  'Self-Help'
]


categories.each do |name|
  Category.find_or_create_by(category_name: name)
end




