Rails.application.routes.draw do

  resource :session

  get "/main", to: 'static_pages#splash_page', as: 'main'
  root 'static_pages#root'


  resources :users

  namespace :api, defaults: {format: :json} do
    resources :quizzes, only: [:index, :show]
    resources :questions, only: [:update, :create]
    resources :answers, only: [:update, :create]
  end

end
