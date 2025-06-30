class ChangeStatusToIntegerInBooks < ActiveRecord::Migration[7.0]
  def up
    # Add new integer column with default value 0 (available)
    add_column :books, :status_temp, :integer, default: 0, null: false


    # Migrate old string statuses to integer
    Book.reset_column_information
    Book.find_each do |book|
      book.status_temp = case book.status
                         when 'available' then 0
                         when 'unavailable' then 1
                         when 'archived' then 2
                         else 0
                         end
      book.save!(validate: false)
    end


    # Remove old string status column
    remove_column :books, :status


    # Rename new column to status
    rename_column :books, :status_temp, :status
  end


  def down
    # Reverse migration if needed
    add_column :books, :status_temp, :string


    Book.reset_column_information
    Book.find_each do |book|
      book.status_temp = Book.statuses.key(book.status) || 'available'
      book.save!(validate: false)
    end


    remove_column :books, :status
    rename_column :books, :status_temp, :status
  end
end


