require 'unirest'
require 'cgi'

def remove_noise(text)
  CGI.unescape_html(text).gsub(/<.*>/,"").gsub("&nbsp;","")
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

# These code snippets use an open-source library. http://unirest.io/ruby
(0...topics.count).each do |topic_id|
  response = Unirest.get "https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=#{topic_id}&limit=20&page=1",
  headers:{
    "X-Mashape-Key" => "R4g1NTnlk7mshLVy1yqqmebQ88p0p1SX2DijsnBlBgRDvwpLUx",
    "Accept" => "application/json"
  }

  questions = response.body


  questions.each do |quiz|
    topic = topics[topic_id]
    catagorys[topic] << quiz
  end

  sleep(1)
end

@user = User.find_by(email: "joshua@josh.com")

catagorys.each do |cat, quiz_arr|
  quiz = @user.quizzes.create({name: cat, edited: true})

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
