class AddHandleToClips < ActiveRecord::Migration[5.1]
  def change
    add_column :clips, :handle, :string, default: ''
  end
end
