FactoryGirl.define do
  factory :cheatsheet do
    sequence(:title) { |n| "CheatSheet ##{n}" }
  end
end
