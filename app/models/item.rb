class Item < ActiveRecord::Base
  belongs_to :cheatsheet
  validates :name, presence: true
  validates :description, presence: true
  validates :cheatsheet, presence: true
  validates :rank, presence: true
end
