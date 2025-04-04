class CreateReviews < ActiveRecord::Migration[8.0]
  def change
    create_table :reviews do |t|
      t.references :appointment, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.integer :satisfaction_score
      t.text :description

      t.timestamps
    end
    add_index :reviews, :satisfaction_score
  end
end
