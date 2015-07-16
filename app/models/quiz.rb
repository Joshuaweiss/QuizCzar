# == Schema Information
#
# Table name: quizzes
#
#  id      :integer          not null, primary key
#  name    :string           not null
#  user_id :integer          not null
#

class Quiz < ActiveRecord::Base

  validates :name, :user_id, presence: true

  belongs_to :user
  has_many :questions, dependent: :destroy

end
