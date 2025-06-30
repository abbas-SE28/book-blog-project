class Book < ApplicationRecord
  belongs_to :category
  has_many :comments, dependent: :destroy
  
  validates :title, presence: true
  validates :author, presence: true
  validates :description, presence: true
  validates :status, presence: true
  validates :category_id, presence: true 
  
  enum status: { Still_reading: 0, Finshed_reading: 1 }



  after_initialize :set_default_date_added, if: :new_record?


  private


 


  def set_default_date_added
    self.date_added ||= Time.current
  end
end
