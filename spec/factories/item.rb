FactoryGirl.define do
  factory :cheatsheet do
    sequence(:title) { |n| "CheatSheet Item ##{n}" }
    description { Faker::Lorem.sentence }
    association :cheatsheet
  end
end