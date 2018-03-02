class ChangeArtistColumnOnClips < ActiveRecord::Migration[5.1]
  def change
    change_column :clips, :artist, :string, default: ''
  end
end
