FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "joe.test#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end
end
