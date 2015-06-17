class Cheatsheet < ActiveRecord::Base
  has_many :items
  validates :title, presence: true
end
