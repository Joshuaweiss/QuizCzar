Rails.application.routes.draw do

  resource :session

  get "/main", to: 'static_pages#splash_page', as: 'main'
  root 'static_pages#root'


  resources :users

  namespace :api, defaults: {format: :json} do
    resources :quizzes, only: [:create, :index, :show, :update, :destroy] do
      resources :grades, only: [:create, :index]
    end
    resources :questions, only: [:update, :create, :destroy]
    resources :answers, only: [:update, :create]
    resource :session
    resources :users, only: [:show, :update]
  end
  get '/auth/:provider/callback', to: 'sessions#auth_create'

end
