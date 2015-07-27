Rails.application.routes.draw do

  resource :session

  root 'static_pages#root'


  namespace :api, defaults: {format: :json} do
    resources :quizzes, only: [:create, :index, :show, :update, :destroy] do
      resources :grades, only: [:create, :index]
    end
    resources :questions, only: [:update, :create, :destroy]
    resources :answers, only: [:update, :create]
    resource :session
    post "session/guest", to: "sessions#guest_sign_in"
    resources :users, only: [:show, :update, :create]
  end
  get '/auth/:provider/callback', to: 'sessions#auth_create'

end
