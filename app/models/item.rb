class Item < ActiveRecord::Base
  belongs_to :cheatsheet
  validates :name, :description, :cheatsheet, presence: true
  acts_as_list column: 'rank', scope: :cheatsheet
end
