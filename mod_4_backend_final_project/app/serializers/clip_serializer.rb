class ClipSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :artist, :user
end
