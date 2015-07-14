Rails.application.routes.draw do

  resource :session

  get "", to: 'static_pages#splash_page'

end
