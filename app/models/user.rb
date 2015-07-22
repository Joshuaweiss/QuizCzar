# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  name            :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#

include BCrypt

class User < ActiveRecord::Base

  has_attached_file :picture, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "user_placeholder.png"
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/
  validates_attachment_size :picture, { :in => 0..8.megabytes }

  validates :email, :name, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, maximum: 20, allow_nil: true}
  before_validation :session_token_exists

  has_many :quizzes, dependent: :destroy
  has_many :grades, dependent: :destroy

  attr_reader :password

  def self.new_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)

    return user
  end

  def reset_session_token
    self.session_token = User.new_session_token;
    self.save
  end

  def password=(password)
    @password = password;
    self.password_digest = Password.create(password);
  end

  def is_password?(password)
    Password.new(self.password_digest).is_password?(password);
  end

  def session_token_exists
    self.session_token ||= User.new_session_token
  end


end
