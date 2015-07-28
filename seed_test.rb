require 'unirest'
require 'cgi'

def remove_noise(text)
  CGI.unescape_html(text).gsub(/<.*>/,"").gsub("&nbsp;"," ")
end

@pics_left = 0
@user_current = nil

def make_user()
  if (@pics_left === 0)

    begin
      user_data = Unirest.get("https://randomuser.me/api/").body["results"].first["user"]

      user = User.create!({
          name: "#{user_data["name"]["first"]} #{user_data["name"]["last"]}",
          email: user_data["email"],
          password: SecureRandom.urlsafe_base64(15)
        })

      user.picture

      url = user_data["picture"]["medium"]
      url = url.gsub("­http","htt­ps")
      url += "?type=large"
      open(url, :allow_redirections => :safe) do |r|
        user.picture = r.base_uri.to_s
      end

      user.save!

    rescue StandardError => e
      puts e
      sleep(1)
      retry
    end

    @pics_left = rand(10)
    @user_current = user
  else
    @pics_left -= 1
    @user_current
  end
end

response = Unirest.get "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getCategoryList",
  headers:{
    "X-Mashape-Key" => "R4g1NTnlk7mshLVy1yqqmebQ88p0p1SX2DijsnBlBgRDvwpLUx",
    "Accept" => "application/json"
  }

topics = response.body

topics.map! do |item|
  item["categ_name"]
end

catagorys = Hash.new { |hash,key| hash[key] = [] }
# topics.count
# These code snippets use an open-source library. http://unirest.io/ruby
(0...topics.count).each do |topic_id|

  begin
    response = Unirest.get "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=#{topic_id}&limit=20&page=1",
    headers:{
      "X-Mashape-Key" => "R4g1NTnlk7mshLVy1yqqmebQ88p0p1SX2DijsnBlBgRDvwpLUx",
      "Accept" => "application/json"
    }
  rescue StandardError => e
    puts e
    sleep 1
    retry
  end

  questions = response.body


  questions.each do |quiz|
    topic = topics[topic_id]
    catagorys[topic] << quiz
  end

  sleep(1)
end


catagorys.each do |cat, quiz_arr|
  user = make_user

  quiz = user.quizzes.create({name: cat, edited: true})

  quiz_arr.shuffle.take(20).each do |quiz_data|
    question = quiz.questions.create({question: remove_noise(quiz_data["q_text"])})
    correct_question = quiz_data["q_correct_option"]
    (1..4).each do |question_n|
      question.answers.new({
        correct: correct_question === question_n,
        answer: remove_noise(quiz_data["q_options_#{question_n}"])
      })
    end
    question.save
  end

  quiz.save

end
