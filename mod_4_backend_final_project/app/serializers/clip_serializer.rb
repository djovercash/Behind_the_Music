class ClipSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :url, :handle, :user
end
