FactoryGirl.define do
  factory :cheatsheet do
    sequence(:name) { |n| "CheatSheet ##{n}" }

    association :user
  end
end