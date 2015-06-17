class CheatsheetSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :items
end
