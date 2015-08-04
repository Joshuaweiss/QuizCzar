# == Schema Information
#
# Table name: users
#
#  id                   :integer          not null, primary key
#  email                :string           not null
#  name                 :string           not null
#  password_digest      :string           not null
#  session_token        :string           not null
#  picture_file_name    :string
#  picture_content_type :string
#  picture_file_size    :integer
#  picture_updated_at   :datetime
#  guest                :boolean          default(FALSE), not null
#

include BCrypt

class User < ActiveRecord::Base

  has_attached_file :picture,
                    :styles => { :medium => "300x300>", :thumb => "100x100>" },
                    :default_url => "user_placeholder.png"
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/
  validates_attachment_size :picture, { :in => 0..8.megabytes }

  validates :name, :password_digest, :session_token, presence: true
  validates :email, :session_token, {uniqueness: true, allow_blank: true}
  validates :password, length: {minimum: 6, maximum: 20, allow_nil: true}
  before_validation :session_token_exists

  validate :has_auth_or_email

  has_many :quizzes, dependent: :destroy
  has_many :grades, dependent: :destroy
  has_many :auths, inverse_of: :user

  attr_reader :password

  def self.guest_user
    user = User.create!({
      name: "Guest User",
      password: SecureRandom.urlsafe_base64(15),
      guest: true,
      email: ""
    })



    @quiz = user.quizzes.create({name: "Example Quiz", edited: false})
    @quiz.save!

    question = @quiz.questions.create!({question: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"});
    question.answers.create(answer:"All he could chuck",correct: true);
    question.answers.create(answer:"None",correct: false);
    question.answers.create(answer:"4 Pounds",correct: false);
    question.answers.create(answer:"1 Pound",correct: false);

    question = @quiz.questions.create!({question: "Peter Piper picked a pair of?"});
    question.answers.create(answer:"Pickled peppers",correct: true);
    question.answers.create(answer:"Prickly Pears",correct: false);
    question.answers.create(answer:"Porous Plums",correct: false);
    question.answers.create(answer:"Bananas",correct: false);

    question = @quiz.questions.create!({question: "Mary had a little?"});
    question.answers.create(answer:"Lamb",correct: true);
    question.answers.create(answer:"Sheep",correct: false);
    question.answers.create(answer:"Dog",correct: false);
    question.answers.create(answer:"Cat",correct: false);



    @quiz = user.quizzes.create({name: "Computers", edited: false})
    @quiz.save!

    question = @quiz.questions.create!({question: "Which of the following memories is an optical memory?"});
    question.answers.create(answer:"Floppy Disk",correct: false);
    question.answers.create(answer:"Bubble Memories",correct: false);
    question.answers.create(answer:"CD–ROM",correct: true);
    question.answers.create(answer:"Core Memories",correct: false);

    question = @quiz.questions.create!({question: "DNS refers to"});
    question.answers.create(answer:"Data Number Sequence",correct: false);
    question.answers.create(answer:"Digital Network Service",correct: true);
    question.answers.create(answer:"Domain Name System",correct: false);
    question.answers.create(answer:"Disk Numbering System",correct: false);

    question = @quiz.questions.create!({question: "Java was originally invented by"});
    question.answers.create(answer:"Oracle",correct: false);
    question.answers.create(answer:"Sun",correct: true);
    question.answers.create(answer:"Microsoft",correct: false);
    question.answers.create(answer:"Novell",correct: false);

    question = @quiz.questions.create!({question: "The unit of speed used for super computer is"});
    question.answers.create(answer:"KELOPS",correct: false);
    question.answers.create(answer:"GELOPS",correct: true);
    question.answers.create(answer:"MELOPS",correct: false);
    question.answers.create(answer:"None of these",correct: false);

    question = @quiz.questions.create!({question: "Whose trademark is the operating system UNIX?"});
    question.answers.create(answer:"Motorola",correct: false);
    question.answers.create(answer:"Microsoft",correct: false);
    question.answers.create(answer:"AshtonTate",correct: false);
    question.answers.create(answer:"BELL Laboratories",correct: true);


    user.quizzes.each do |quiz|

      4.times do
        user.grades.create!(
          quiz_id: @quiz.id,
          correct_answers: rand(quiz.questions.count + 1),
          number_of_questions: quiz.questions.count
        )
      end

    end

    user
  end

  def self.new_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)

    return user
  end

  def has_auth_or_email
    unless guest || (auths.size > 0 || email.presence)
      errors.add(:email, "accounts must have an Email");
    end
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
