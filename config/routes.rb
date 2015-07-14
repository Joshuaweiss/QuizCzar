Rails.application.routes.draw do

  resource :session

  get "/main", to: 'static_pages#splash_page'
  get "", to: 'static_pages#root'


  resources :users

end
