class CreateAuths < ActiveRecord::Migration
  def change
    create_table :auths do |t|
      t.string :provider_id
      t.string :provider
      t.integer :user_id
    end
    add_index :auths, [:provider_id, :provider], unique: true
  end
end
