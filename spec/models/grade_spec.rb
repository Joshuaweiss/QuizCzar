# == Schema Information
#
# Table name: grades
#
#  id                  :integer          not null, primary key
#  correct_answers     :integer          not null
#  number_of_questions :integer          not null
#  quiz_id             :integer          not null
#  user_id             :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'rails_helper'

RSpec.describe Grade, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
