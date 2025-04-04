# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

first_coach = User.create!(
  email: 'basketball_coach@example.com',
  password: 'BallIsLife',
  full_name: 'Kyrie Irving',
  phone_number: '+1 (917)-942-9777',
  role: :coach
)

second_coach = User.create!(
  email: 'life_coach@example.com',
  password: 'LifeCoach4Ever',
  full_name: 'Deepak Chopra',
  phone_number: '+1 (646)-432-7477',
  role: :coach
)

first_customer = User.create!(
  email: 'testuser1@example.com',
  password: 'test_password',
  full_name: 'Test User 1',
  phone_number: '+1 (917)-483-2847',
  role: :user
)

second_customer = User.create!(
  email: 'testuser2@example.com',
  password: 'test_password',
  full_name: 'Test User 2',
  phone_number: '+1 (212)-538-2947',
  role: :user
)
