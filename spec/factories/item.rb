FactoryGirl.define do
  factory :item do
    sequence(:name) { |n| "CheatSheet Item ##{n}" }
    sequence(:description) { |n| "Description for #{name}" }
    sequence(:rank) { |n| "#{n}" }
    association :cheatsheet
  end
end