class CreateClips < ActiveRecord::Migration[5.1]
  def change
    create_table :clips do |t|
      t.string :url
      t.string :title
      t.string :artist
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
