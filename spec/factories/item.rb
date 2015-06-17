FactoryGirl.define do
  factory :item do
    sequence(:title) { |n| "CheatSheet Item ##{n}" }
    description { Faker::Lorem.sentence }
    association :cheatsheet
  end
end