class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :rank
end
