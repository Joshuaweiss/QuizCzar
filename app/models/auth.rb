# == Schema Information
#
# Table name: auths
#
#  id          :integer          not null, primary key
#  provider_id :string
#  provider    :string
#  user_id     :integer
#

class Auth < ActiveRecord::Base

  validates :provider_id, :provider, :user, presence: true

  belongs_to :user, inverse_of: :auths

  def self.find_by_auth(provider, provider_id)
    Auth.find_by({provider: provider, provider_id: provider_id})
  end

end
